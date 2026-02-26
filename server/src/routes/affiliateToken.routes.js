// controllers/affiliateToken.controller.js
const Affiliate = require('../models/Affiliate.model');
const winston = require('winston');

const affiliateTokenController = {
  // Validate token and redirect to dashboard
  async validateToken(req, res) {
    try {
      const { token } = req.params;
      
      console.log('🔍 Validating affiliate token:', token);
      
      const affiliate = await Affiliate.findOne({ 
        dashboardToken: token,
        isActive: true 
      }).populate('user', 'name email');
      
      if (!affiliate) {
        console.log('❌ Invalid token:', token);
        return res.status(401).json({ 
          success: false, 
          error: 'Invalid or expired dashboard link' 
        });
      }
      
      console.log('✅ Valid token for affiliate:', affiliate.affiliateCode);
      
      // Set a session cookie for the affiliate (optional)
      res.cookie('affiliate_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
      });
      
      // Return success with affiliate data
      return res.status(200).json({
        success: true,
        message: 'Token validated successfully',
        data: {
          id: affiliate._id,
          name: affiliate.user?.name,
          email: affiliate.user?.email,
          affiliateCode: affiliate.affiliateCode,
          referralLink: affiliate.referralLink,
          token: token
        }
      });
      
    } catch (error) {
      winston.error('Validate token error:', error);
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
      
      const affiliate = await Affiliate.findOne({ 
        dashboardToken: token,
        isActive: true 
      }).populate('user', 'name email');
      
      if (!affiliate) {
        return res.status(401).json({ 
          success: false, 
          error: 'Invalid or expired dashboard link' 
        });
      }
      
      return res.status(200).json({
        success: true,
        data: {
          id: affiliate._id,
          name: affiliate.user?.name,
          email: affiliate.user?.email,
          affiliateCode: affiliate.affiliateCode,
          referralLink: affiliate.referralLink
        }
      });
      
    } catch (error) {
      winston.error('Get affiliate from token error:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to get affiliate data' 
      });
    }
  }
};

module.exports = affiliateTokenController;