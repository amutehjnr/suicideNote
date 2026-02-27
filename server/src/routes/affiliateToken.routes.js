// routes/affiliateToken.routes.js
const express = require('express');
const router = express.Router();
const affiliateTokenController = require('../controllers/affiliateToken.controller');
const User = require('../models/User.model');
const Affiliate = require('../models/Affiliate.model');

// Public routes for token validation
router.get('/validate/:token', affiliateTokenController.validateToken);
router.get('/info/:token', affiliateTokenController.getAffiliateFromToken);

// Debug route - NO AUTH REQUIRED
router.get('/check/:email', async (req, res) => {
  try {
    const { email } = req.params;
    
    console.log('🔍 Debug check for email:', email);
    
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.json({ 
        success: false, 
        error: 'User not found',
        email 
      });
    }
    
    const affiliate = await Affiliate.findOne({ user: user._id });
    if (!affiliate) {
      return res.json({ 
        success: false, 
        error: 'Affiliate not found',
        userId: user._id 
      });
    }
    
    return res.json({
      success: true,
      data: {
        user: {
          email: user.email,
          name: user.name,
          id: user._id
        },
        affiliate: {
          code: affiliate.affiliateCode,
          link: affiliate.referralLink,
          dashboardToken: affiliate.dashboardToken,
          hasToken: !!affiliate.dashboardToken,
          isActive: affiliate.isActive,
          createdAt: affiliate.createdAt
        },
        dashboardUrl: affiliate.dashboardToken ? 
          `https://suicidenote.onrender.com/affiliate/token/${affiliate.dashboardToken}` : 
          'No token - run migration'
      }
    });
  } catch (error) {
    console.error('Debug error:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

module.exports = router;