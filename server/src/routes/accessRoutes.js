// backend/routes/accessRoutes.js
const express = require('express');
const router = express.Router();
const AccessCode = require('../models/AccessCode.model');
const Ebook = require('../models/Ebook.model');
const Purchase = require('../models/Purchase.model');

// Validate access code
router.post('/validate', async (req, res) => {
  try {
    const { code, ebookId } = req.body;
    
    console.log('🔑 Validating access code:', { code, ebookId });
    
    if (!code || !ebookId) {
      return res.status(400).json({
        success: false,
        error: 'Access code and ebook ID are required'
      });
    }
    
    // Clean the code
    const cleanCode = code.trim().toUpperCase();
    
    // Find the access code
    const accessCode = await AccessCode.findOne({ 
      code: cleanCode,
      ebook: ebookId
    })
    .populate('ebook', 'title author coverImage')
    .populate('purchase', 'amount status reference')
    .populate('user', 'name email');
    
    if (!accessCode) {
      return res.status(404).json({
        success: false,
        error: 'Access code not found'
      });
    }
    
    // Check if code is active
    if (!accessCode.isActive) {
      return res.status(403).json({
        success: false,
        error: 'Access code has been revoked'
      });
    }
    
    // Check if code has expired
    if (new Date() > accessCode.expiresAt) {
      return res.status(403).json({
        success: false,
        error: 'Access code has expired'
      });
    }
    
    // Increment access count
    await accessCode.incrementAccess({
      device: req.headers['user-agent'],
      ipAddress: req.ip
    });
    
    // Return success with access info
    res.json({
      success: true,
      data: {
        accessCode: accessCode.code,
        ebook: {
          id: accessCode.ebook._id,
          title: accessCode.ebook.title,
          author: accessCode.ebook.author,
          coverImage: accessCode.ebook.coverImage
        },
        purchase: accessCode.purchase ? {
          id: accessCode.purchase._id,
          amount: accessCode.purchase.amount,
          status: accessCode.purchase.status,
          reference: accessCode.purchase.reference
        } : null,
        user: accessCode.user ? {
          name: accessCode.user.name,
          email: accessCode.user.email
        } : null,
        accessCount: accessCode.accessCount,
        lastAccessedAt: accessCode.lastAccessedAt,
        expiresAt: accessCode.expiresAt,
        isActive: accessCode.isActive
      }
    });
    
  } catch (error) {
    console.error('Access validation error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Create access code from purchase
router.post('/create', async (req, res) => {
  try {
    const { purchaseId, ebookId, userId } = req.body;
    
    console.log('🔑 Creating access code:', { purchaseId, ebookId, userId });
    
    if (!purchaseId || !ebookId || !userId) {
      return res.status(400).json({
        success: false,
        error: 'Purchase ID, ebook ID, and user ID are required'
      });
    }
    
    // Verify purchase exists and is successful
    const purchase = await Purchase.findById(purchaseId);
    if (!purchase) {
      return res.status(404).json({
        success: false,
        error: 'Purchase not found'
      });
    }
    
    if (purchase.status !== 'successful') {
      return res.status(400).json({
        success: false,
        error: 'Purchase is not successful'
      });
    }
    
    // Verify ebook exists
    const ebook = await Ebook.findById(ebookId);
    if (!ebook) {
      return res.status(404).json({
        success: false,
        error: 'Ebook not found'
      });
    }
    
    // Check if access code already exists for this purchase
    const existingAccess = await AccessCode.findOne({ 
      purchase: purchaseId,
      ebook: ebookId,
      user: userId
    });
    
    if (existingAccess) {
      return res.json({
        success: true,
        data: {
          accessCode: existingAccess.code,
          message: 'Access code already exists'
        }
      });
    }
    
    // Generate unique access code
    let code;
    let isUnique = false;
    
    while (!isUnique) {
      code = AccessCode.generateCode();
      const existing = await AccessCode.findOne({ code });
      if (!existing) {
        isUnique = true;
      }
    }
    
    // Set expiry date (1 year from now)
    const expiresAt = new Date();
    expiresAt.setFullYear(expiresAt.getFullYear() + 1);
    
    // Create access code
    const accessCode = new AccessCode({
      code,
      user: userId,
      ebook: ebookId,
      purchase: purchaseId,
      expiresAt,
      metadata: {
        device: req.headers['user-agent'],
        ipAddress: req.ip
      }
    });
    
    await accessCode.save();
    
    res.status(201).json({
      success: true,
      data: {
        accessCode: code,
        expiresAt,
        message: 'Access code created successfully'
      }
    });
    
  } catch (error) {
    console.error('Create access code error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Get user's access codes
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const accessCodes = await AccessCode.find({ user: userId })
      .populate('ebook', 'title author coverImage')
      .populate('purchase', 'amount purchasedAt')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: {
        accessCodes: accessCodes.map(code => ({
          code: code.code,
          ebook: code.ebook,
          purchase: code.purchase,
          isActive: code.isActive,
          accessCount: code.accessCount,
          lastAccessedAt: code.lastAccessedAt,
          expiresAt: code.expiresAt,
          createdAt: code.createdAt
        }))
      }
    });
    
  } catch (error) {
    console.error('Get user access codes error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Revoke access code
router.post('/revoke/:code', async (req, res) => {
  try {
    const { code } = req.params;
    
    const accessCode = await AccessCode.findOne({ code });
    
    if (!accessCode) {
      return res.status(404).json({
        success: false,
        error: 'Access code not found'
      });
    }
    
    accessCode.isActive = false;
    await accessCode.save();
    
    res.json({
      success: true,
      data: {
        message: 'Access code revoked successfully'
      }
    });
    
  } catch (error) {
    console.error('Revoke access code error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

module.exports = router;