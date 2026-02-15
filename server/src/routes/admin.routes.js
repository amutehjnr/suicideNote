const express = require('express');
const router = express.Router();
const adminAuthController = require('../controllers/adminAuth.controller');
const adminDashboardController = require('../controllers/adminDashboard.controller');
const adminController = require('../controllers/admin.controller');
const adminMiddleware = require('../middleware/admin.middleware');

// Public auth routes
router.get('/signin', adminAuthController.getSignInPage);
router.post('/auth/signin', adminAuthController.signIn);
router.post('/auth/signout', adminAuthController.signOut);
router.post('/auth/forgot-password', adminAuthController.forgotPassword);
router.post('/auth/reset-password', adminAuthController.resetPassword);
router.post('/auth/refresh', adminAuthController.refreshToken);

// Protected routes - require authentication
router.use(adminMiddleware.protect);

// Auth routes (protected)
router.get('/auth/profile', adminAuthController.getProfile);
router.put('/auth/profile', adminAuthController.updateProfile);
router.put('/auth/change-password', adminAuthController.changePassword);
router.get('/auth/login-history', adminAuthController.getLoginHistory);
router.post('/auth/2fa/setup', adminAuthController.setup2FA);
router.post('/auth/2fa/enable', adminAuthController.enable2FA);
router.post('/auth/2fa/disable', adminAuthController.disable2FA);

// Dashboard pages
router.get('/dashboard', adminDashboardController.getDashboard);
router.get('/transactions', adminDashboardController.getTransactionsPage);
router.get('/access-codes', adminDashboardController.getAccessCodesPage);
router.get('/users', adminDashboardController.getUsersPage);
router.get('/affiliates', adminDashboardController.getAffiliatesPage);
router.get('/free-access', adminDashboardController.getFreeAccessPage);
router.get('/settings', adminDashboardController.getSettingsPage);

// API routes (from previous admin controller)
router.get('/dashboard/stats', adminController.getDashboardStats);
router.get('/transactions', adminController.getAllTransactions);
router.get('/transactions/:id', adminController.getTransactionById);
router.post('/transactions/:purchaseId/refund', adminController.processRefund);
router.get('/access-codes', adminController.getAllAccessCodes);
router.get('/access-codes/:id', adminController.getAccessCodeById);
router.post('/free-access/send', adminController.sendFreeAccessCode);
router.post('/free-access/bulk-send', adminController.bulkSendFreeAccess);
router.get('/free-access/grants', adminController.getFreeAccessGrants);
router.put('/free-access/revoke/:accessCodeId', adminController.revokeFreeAccess);
router.get('/users/:userId', adminController.getUserDetails);
router.get('/affiliates/stats', adminController.getAffiliateStats);
router.get('/export', adminController.exportData);

// Super admin only routes
router.use(adminMiddleware.isSuperAdmin);
router.get('/admins', adminController.getAllAdmins);
router.post('/admins', adminController.createAdmin);
router.put('/admins/:adminId', adminController.updateAdmin);
router.delete('/admins/:adminId', adminController.deleteAdmin);

module.exports = router;