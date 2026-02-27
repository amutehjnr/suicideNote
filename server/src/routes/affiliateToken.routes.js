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

// Add this temporary debug route
router.get('/check/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const User = require('../models/User.model');
    const Affiliate = require('../models/Affiliate.model');
    
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.json({ success: false, error: 'User not found' });
    }
    
    const affiliate = await Affiliate.findOne({ user: user._id });
    if (!affiliate) {
      return res.json({ success: false, error: 'Affiliate not found' });
    }
    
    return res.json({
      success: true,
      data: {
        email: user.email,
        affiliateCode: affiliate.affiliateCode,
        dashboardToken: affiliate.dashboardToken,
        hasToken: !!affiliate.dashboardToken,
        dashboardUrl: affiliate.dashboardToken ? 
          `https://suicidenote.onrender.com/affiliate/token/${affiliate.dashboardToken}` : 
          'No token - run migration'
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;