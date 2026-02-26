// routes/affiliateToken.routes.js
const express = require('express');
const router = express.Router();
const affiliateTokenController = require('../controllers/affiliateToken.controller');

// Public routes for token validation
router.get('/validate/:token', affiliateTokenController.validateToken);
router.get('/info/:token', affiliateTokenController.getAffiliateFromToken);

module.exports = router;