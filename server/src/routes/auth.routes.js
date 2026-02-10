const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');
const Joi = require('joi');

// Validation schemas
const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

const resetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const updateProfileSchema = Joi.object({
  name: Joi.string().min(2).max(50),
  phone: Joi.string().pattern(/^[0-9]{10,15}$/),
  bio: Joi.string().max(500),
  socialLinks: Joi.object({
    twitter: Joi.string().uri(),
    facebook: Joi.string().uri(),
    instagram: Joi.string().uri(),
    linkedin: Joi.string().uri(),
  }),
  notifications: Joi.object({
    emailNotifications: Joi.boolean(),
    affiliateNotifications: Joi.boolean(),
  }),
  settings: Joi.object({
    theme: Joi.string().valid('light', 'dark', 'auto'),
    fontSize: Joi.number().min(12).max(24),
  }),
});

const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().min(6).required(),
});

// Public routes
router.post(
  '/register',
  authMiddleware.sanitize(['name', 'email']),
  authMiddleware.validate(registerSchema),
  authController.register
);

router.post(
  '/login',
  authMiddleware.sanitize(['email']),
  authMiddleware.validate(loginSchema),
  authController.login
);

router.post(
  '/forgot-password',
  authMiddleware.sanitize(['email']),
  authMiddleware.validate(forgotPasswordSchema),
  authController.forgotPassword
);

router.post(
  '/reset-password',
  authMiddleware.validate(resetPasswordSchema),
  authController.resetPassword
);

router.get(
  '/verify-email/:token',
  authController.verifyEmail
);

// Protected routes
router.post(
  '/become-affiliate',
  authMiddleware.protect,
  authController.becomeAffiliate
);

router.get(
  '/profile',
  authMiddleware.protect,
  authController.getProfile
);

router.put(
  '/profile',
  authMiddleware.protect,
  authMiddleware.sanitize(['name', 'phone', 'bio']),
  authMiddleware.validate(updateProfileSchema),
  authController.updateProfile
);

router.post(
  '/change-password',
  authMiddleware.protect,
  authMiddleware.validate(changePasswordSchema),
  authController.changePassword
);

router.get(
  '/validate-token',
  authMiddleware.optional,
  authController.validateToken
);

module.exports = router;