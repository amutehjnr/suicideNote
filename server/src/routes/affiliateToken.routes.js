// routes/affiliateToken.routes.js
const express = require('express');
const router = express.Router();
const affiliateTokenController = require('../controllers/affiliateToken.controller');

// Public routes for token validation
router.get('/validate/:token', affiliateTokenController.validateToken);
router.get('/info/:token', affiliateTokenController.getAffiliateFromToken);

// Add this test route
router.get('/test', (req, res) => {
  res.json({ 
    message: 'Affiliate token routes are working',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;