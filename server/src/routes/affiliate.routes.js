// routes/affiliate.routes.js
const express = require('express');
const router = express.Router();
const affiliateController = require('../controllers/affiliate.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { validate } = require('../middleware/validation.middleware');
const Joi = require('joi');

// Validation schemas
const createCampaignSchema = Joi.object({
  name: Joi.string().required().min(3).max(50),
  description: Joi.string().optional().max(200),
  medium: Joi.string().optional(),
  source: Joi.string().optional(),
});

const updateBankDetailsSchema = Joi.object({
  accountNumber: Joi.string().pattern(/^[0-9]{10}$/).required(),
  accountName: Joi.string().required().min(3).max(100),
  bankCode: Joi.string().required(),
  bankName: Joi.string().required(),
});

const requestPayoutSchema = Joi.object({
  amount: Joi.number().positive().required(),
});

const updateSettingsSchema = Joi.object({
  notifications: Joi.object({
    onSale: Joi.boolean(),
    onPayout: Joi.boolean(),
    monthlyReport: Joi.boolean(),
  }),
  settings: Joi.object({
    autoWithdraw: Joi.boolean(),
    withdrawThreshold: Joi.number().positive(),
    payoutMethod: Joi.string().valid('paystack', 'bank', 'wallet'),
  }),
  paymentThreshold: Joi.number().positive(),
});

// Middleware to check if user is affiliate
const isAffiliate = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Authentication required' });
    }
    
    if (req.user.role !== 'affiliate' && !req.user.affiliateId) {
      return res.status(403).json({ success: false, error: 'Affiliate account required' });
    }
    
    const affiliate = await require('../models/Affiliate.model').findById(req.user.affiliateId);
    
    if (!affiliate || !affiliate.isActive) {
      return res.status(403).json({ success: false, error: 'Affiliate account not active' });
    }
    
    req.affiliate = affiliate;
    next();
  } catch (error) {
    console.error('Affiliate middleware error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// ==================== PUBLIC ROUTES ====================

// Track affiliate click (public - no auth needed)
router.get('/track/:code', affiliateController.trackClick);

// ==================== PROTECTED ROUTES ====================

// Create affiliate account
router.post('/register', authMiddleware.protect, affiliateController.registerAffiliate);

// Get affiliate dashboard data
router.get('/dashboard', authMiddleware.protect, isAffiliate, affiliateController.getDashboard);

// Get earnings summary
router.get('/earnings', authMiddleware.protect, isAffiliate, affiliateController.getEarnings);

// Get referrals list
router.get('/referrals', authMiddleware.protect, isAffiliate, affiliateController.getReferrals);

// Get performance report
router.get('/performance', authMiddleware.protect, isAffiliate, affiliateController.getPerformanceReport);
router.get('/performance/:period', authMiddleware.protect, isAffiliate, affiliateController.getPerformanceReport);

// Campaign management
router.post('/campaigns', 
  authMiddleware.protect, 
  isAffiliate, 
  validate(createCampaignSchema), 
  affiliateController.createCampaign
);

router.get('/campaigns', authMiddleware.protect, isAffiliate, affiliateController.getCampaigns);
router.get('/campaigns/:name', authMiddleware.protect, isAffiliate, affiliateController.getCampaignAnalytics);

// Bank details
router.post('/bank-details', 
  authMiddleware.protect, 
  isAffiliate, 
  validate(updateBankDetailsSchema), 
  affiliateController.updateBankDetails
);

router.get('/bank-details', authMiddleware.protect, isAffiliate, affiliateController.getBankDetails);

// Payouts
router.post('/request-payout', 
  authMiddleware.protect, 
  isAffiliate, 
  validate(requestPayoutSchema), 
  affiliateController.requestPayout
);

router.get('/payouts', authMiddleware.protect, isAffiliate, affiliateController.getPayoutHistory);

// Settings
router.put('/settings', 
  authMiddleware.protect, 
  isAffiliate, 
  validate(updateSettingsSchema), 
  affiliateController.updateSettings
);

// Generate campaign link
router.post('/generate-link', 
  authMiddleware.protect, 
  isAffiliate, 
  affiliateController.generateCampaignLink
);

// Leaderboard (public with affiliate check)
router.get('/leaderboard', affiliateController.getLeaderboard);

// Account management
router.post('/deactivate', authMiddleware.protect, isAffiliate, affiliateController.deactivateAccount);

module.exports = router;