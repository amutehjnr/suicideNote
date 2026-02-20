const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { validate } = require('../middleware/validation.middleware');
const Joi = require('joi');

// Add debug middleware
const debugMiddleware = (req, res, next) => {
  console.log('🔍 [ROUTE]', req.method, req.originalUrl);
  console.log('🔍 [BODY]', req.body);
  console.log('🔍 [HEADERS] Content-Type:', req.headers['content-type']);
  next();
};

// Validation schemas
const initializePaymentSchema = Joi.object({
  ebookId: Joi.string().required(),
  email: Joi.string().email().required(),
  name: Joi.string().optional(),
  amount: Joi.number().positive().required(),
  currency: Joi.string().valid('NGN', 'USD').default('NGN'),
  affiliateCode: Joi.string().optional().allow(null, ''),
  campaignName: Joi.string().optional(),
});

const verifyPaymentSchema = Joi.object({
  reference: Joi.string().required(),
});

const validateAccessCodeSchema = Joi.object({
  code: Joi.string().required(),
  ebookId: Joi.string().optional(),
  ebookSlug: Joi.string().optional(),
});

// Public routes
router.post(
  '/webhook/paystack',
  express.raw({ type: 'application/json' }),
  paymentController.handlePaystackWebhook
);

router.post(
  '/webhook/stripe',
  express.raw({ type: 'application/json' }),
  paymentController.handleStripeWebhook
);

// Get currency options
router.get(
  '/currency-options',
  paymentController.getCurrencyOptions
);

// Guest checkout route with optional auth
router.post(
  '/initialize',
  express.json(),
  debugMiddleware,
  authMiddleware.optional,
  authMiddleware.validateAffiliateCode,
  authMiddleware.validate(initializePaymentSchema),
  paymentController.initializePayment
);

// Verify payment with guest support
router.post(
  '/verify',
  authMiddleware.optional,
  authMiddleware.validate(verifyPaymentSchema),
  paymentController.verifyPayment
);

// Test route for debugging
router.post('/test-body', (req, res) => {
  console.log('✅ Test endpoint called');
  console.log('📦 Request body:', req.body);
  
  return res.status(200).json({
    success: true,
    message: 'Test successful',
    body: req.body,
  });
});

// Public test route
router.post('/public-test', paymentController.initializePayment);

// Access code validation
router.post(
  '/validate-access-code',
  authMiddleware.validate(validateAccessCodeSchema),
  paymentController.validateAccessCode
);

// Authenticated routes
router.get(
  '/purchases',
  authMiddleware.protect,
  paymentController.getUserPurchases
);

router.get(
  '/purchases/:id',
  authMiddleware.protect,
  paymentController.getPurchaseById
);

// Affiliate routes
router.get(
  '/affiliate/earnings',
  authMiddleware.protect,
  authMiddleware.isAffiliate,
  paymentController.getAffiliateEarnings
);

router.post(
  '/affiliate/request-payout',
  authMiddleware.protect,
  authMiddleware.isAffiliate,
  paymentController.requestPayout
);

router.put(
  '/affiliate/bank-details',
  authMiddleware.protect,
  authMiddleware.isAffiliate,
  paymentController.updateBankDetails
);

// Track affiliate click
router.get(
  '/track-click',
  paymentController.trackAffiliateClick
);

// Simple debug route
router.post('/debug-simple', 
  express.json(),
  (req, res) => {
    res.json({
      success: true,
      message: 'Debug simple route working',
      body: req.body,
      timestamp: new Date().toISOString()
    });
  }
);

module.exports = router;