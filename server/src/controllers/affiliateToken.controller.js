// controllers/affiliateToken.controller.js
const AffiliateService = require('../services/affiliate.service');

const affiliateTokenController = {
  // Validate token and redirect to dashboard
  async validateToken(req, res) {
    try {
      const { token } = req.params;
      
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
      
      // Redirect to dashboard
      return res.redirect(`/affiliate/dashboard?token=${token}`);
      
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