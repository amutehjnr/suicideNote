// middleware/affiliateToken.middleware.js
const Affiliate = require('../models/Affiliate.model');

const authenticateAffiliateToken = async (req, res, next) => {
  try {
    // Get token from query parameter or header
    const token = req.query.token || req.headers['x-affiliate-token'];
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        error: 'Affiliate token required' 
      });
    }
    
    const affiliate = await Affiliate.findOne({ 
      dashboardToken: token,
      isActive: true 
    });
    
    if (!affiliate) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid or expired token' 
      });
    }
    
    req.affiliate = affiliate;
    req.affiliateId = affiliate._id;
    next();
    
  } catch (error) {
    console.error('Affiliate token auth error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Authentication failed' 
    });
  }
};

module.exports = { authenticateAffiliateToken };