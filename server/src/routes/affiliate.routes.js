// routes/affiliate.routes.js
const express = require('express');
const router = express.Router();
const affiliateController = require('../controllers/affiliate.controller');
const { authenticateAffiliateToken } = require('../middleware/affiliateToken.middleware');
const { validate } = require('../middleware/affiliate.middleware');
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

// ==================== TOKEN-BASED AUTH ROUTES ====================

// All dashboard routes require a valid token
router.use(authenticateAffiliateToken);

// Get affiliate dashboard data
router.get('/dashboard', affiliateController.getDashboard);

// Get earnings summary
router.get('/earnings', affiliateController.getEarnings);

// Get referrals list
router.get('/referrals', affiliateController.getReferrals);

// Get campaigns
router.get('/campaigns', affiliateController.getCampaigns);

// Create campaign
router.post('/campaigns', 
  validate(createCampaignSchema), 
  affiliateController.createCampaign
);

// Update bank details
router.post('/bank-details', 
  validate(updateBankDetailsSchema), 
  affiliateController.updateBankDetails
);

// Get bank details
router.get('/bank-details', affiliateController.getBankDetails);

// Request payout
router.post('/request-payout', 
  validate(requestPayoutSchema), 
  affiliateController.requestPayout
);

// Get payout history
router.get('/payouts', affiliateController.getPayoutHistory);

module.exports = router;