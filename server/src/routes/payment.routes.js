const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { validate } = require('../middleware/validation.middleware');
const Joi = require('joi');

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

// Get currency options
router.get(
  '/currency-options',
  paymentController.getCurrencyOptions
);

// Guest checkout route
router.post(
  '/initialize',
  express.json(),
  authMiddleware.optional,
  authMiddleware.validateAffiliateCode,
  authMiddleware.validate(initializePaymentSchema),
  paymentController.initializePayment
);

// Verify payment
router.post(
  '/verify',
  authMiddleware.optional,
  authMiddleware.validate(verifyPaymentSchema),
  paymentController.verifyPayment
);

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

// Track affiliate click
router.get(
  '/track-click',
  paymentController.trackAffiliateClick
);

module.exports = router;