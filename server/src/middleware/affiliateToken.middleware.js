// middleware/affiliateToken.middleware.js
const AffiliateService = require('../services/affiliate.service');

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
    
    const result = await AffiliateService.getAffiliateByToken(token);
    
    if (!result.success) {
      return res.status(401).json({ 
        success: false, 
        error: result.error 
      });
    }
    
    req.affiliate = result.data;
    req.affiliateId = result.data._id;
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