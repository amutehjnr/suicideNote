// controllers/affiliateToken.controller.js
const AffiliateService = require('../services/affiliate.service');

const affiliateTokenController = {
  // Validate token and return JSON (NOT redirect)
  async validateToken(req, res) {
    try {
      const { token } = req.params;
      
      console.log('🔍 Validating token:', token);
      
      if (!token) {
        return res.status(400).json({ 
          success: false, 
          error: 'Token is required' 
        });
      }
      
      const result = await AffiliateService.getAffiliateByToken(token);
      
      if (!result.success) {
        return res.status(401).json({ 
          success: false, 
          error: result.error 
        });
      }
      
      // Set a session cookie for the affiliate
      res.cookie('affiliate_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
      });
      
      // Return JSON instead of redirecting
      return res.status(200).json({
        success: true,
        message: 'Token validated successfully',
        data: {
          id: result.data._id,
          name: result.data.user?.name,
          email: result.data.user?.email,
          affiliateCode: result.data.affiliateCode,
          referralLink: result.data.referralLink,
          token: token
        }
      });
      
    } catch (error) {
      console.error('Validate token error:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to validate token' 
      });
    }
  },

  // Get affiliate data from token
  async getAffiliateFromToken(req, res) {
    try {
      const { token } = req.params;
      
      const result = await AffiliateService.getAffiliateByToken(token);
      
      if (!result.success) {
        return res.status(401).json({ 
          success: false, 
          error: result.error 
        });
      }
      
      return res.status(200).json({
        success: true,
        data: {
          id: result.data._id,
          name: result.data.user?.name,
          email: result.data.user?.email,
          affiliateCode: result.data.affiliateCode,
          referralLink: result.data.referralLink
        }
      });
      
    } catch (error) {
      console.error('Get affiliate from token error:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to get affiliate data' 
      });
    }
  }
};

module.exports = affiliateTokenController;