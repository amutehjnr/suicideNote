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
  console.log('🔍 [HEADERS] Authorization:', req.headers['authorization']);
  next();
};

// Validation schemas
const initializePaymentSchema = Joi.object({
  ebookId: Joi.string().required(),
  email: Joi.string().email().required(),
  name: Joi.string().optional(),
  amount: Joi.number().positive().required(),
  affiliateCode: Joi.string().optional().allow(null, ''),
  campaignName: Joi.string().optional(),
  callback_url: Joi.string().uri().optional()
});

const verifyPaymentSchema = Joi.object({
  reference: Joi.string().required(),
  email: Joi.string().email().optional(),
});

const validateAccessCodeSchema = Joi.object({
  code: Joi.string().required(),
  ebookId: Joi.string().optional().allow('', null), // Optional
  ebookSlug: Joi.string().optional().allow('', null), // Optional
});

const requestRefundSchema = Joi.object({
  purchaseId: Joi.string().required(),
  reason: Joi.string().min(10).max(500).required(),
});

const processPayoutSchema = Joi.object({
  amount: Joi.number().min(5000).required(),
});

const updateBankDetailsSchema = Joi.object({
  accountNumber: Joi.string().pattern(/^[0-9]{10}$/).required(),
  accountName: Joi.string().min(2).max(100).required(),
  bankCode: Joi.string().required(),
  bankName: Joi.string().required(),
});

// Public routes
router.post(
  '/webhook/paystack',
  paymentController.handlePaystackWebhook
);

// router.get(
//   '/banks',
//   authMiddleware.rateLimit(60 * 1000, 10),
//   paymentController.getBanks
// );

// Guest checkout route with optional auth
router.post(
  '/initialize',
  express.json(),
  debugMiddleware, // Add debug logging
  authMiddleware.optional, // Allows both logged in and guest users
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
  console.log('📦 Type of body:', typeof req.body);
  console.log('📦 Body keys:', Object.keys(req.body || {}));
  
  return res.status(200).json({
    success: true,
    message: 'Test successful',
    body: req.body,
    bodyType: typeof req.body,
    bodyKeys: Object.keys(req.body || {})
  });
});

// Public test route (no middleware)
router.post('/public-test', paymentController.initializePayment);

// Authenticated routes
router.post(
  '/validate-access-code',  // But frontend calls /api/access/validate
  authMiddleware.validate(validateAccessCodeSchema),
  paymentController.validateAccessCode
);

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

router.post(
  '/request-refund',
  authMiddleware.protect,
  authMiddleware.validate(requestRefundSchema),
  paymentController.requestRefund
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
  authMiddleware.validate(processPayoutSchema),
  paymentController.requestPayout
);

router.put(
  '/affiliate/bank-details',
  authMiddleware.protect,
  authMiddleware.isAffiliate,
  authMiddleware.validate(updateBankDetailsSchema),
  paymentController.updateBankDetails
);

// router.get(
//   '/affiliate/stats',
//   authMiddleware.protect,
//   authMiddleware.isAffiliate,
//   paymentController.getAffiliateStats
// );

// Admin routes
// router.get(
//   '/admin/stats',
//   authMiddleware.protect,
//   authMiddleware.restrictTo('admin'),
//   paymentController.getPaymentStats
// );

// router.get(
//   '/admin/affiliates',
//   authMiddleware.protect,
//   authMiddleware.restrictTo('admin'),
//   paymentController.getAllAffiliates
// );

// router.post(
//   '/admin/process-payout/:affiliateId',
//   authMiddleware.protect,
//   authMiddleware.restrictTo('admin'),
//   paymentController.adminProcessPayout
// );

// // Track affiliate click (public)
// router.get(
//   '/track-click',
//   paymentController.trackAffiliateClick
// );

// // Generate affiliate link
// router.post(
//   '/affiliate/generate-link',
//   authMiddleware.protect,
//   authMiddleware.isAffiliate,
//   paymentController.generateAffiliateLink
// );

// Simple debug route with NO other middleware
router.post('/debug-simple', 
  express.json(), // Explicit parser
  (req, res, next) => {
    console.log('✅ Debug simple route - Body exists:', !!req.body);
    console.log('✅ Debug simple route - Body:', req.body);
    console.log('✅ Debug simple route - Body keys:', Object.keys(req.body || {}));
    
    // Check raw request
    console.log('✅ Debug simple route - Raw request:', req.rawBody);
    
    res.json({
      success: true,
      message: 'Debug simple route working',
      body: req.body,
      rawBody: req.rawBody,
      timestamp: new Date().toISOString()
    });
  }
);

module.exports = router;