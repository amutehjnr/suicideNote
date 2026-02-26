const AffiliateService = require('../services/affiliate.service');
const winston = require('winston');

const affiliateController = {
  /**
   * Register as an affiliate - PUBLIC ROUTE
   */
  async registerAffiliate(req, res) {
    try {
      const { email, name } = req.body;
      
      if (!email) {
        return res.status(400).json({ 
          success: false, 
          error: 'Email is required' 
        });
      }
      
      console.log('📝 Registering affiliate with email:', email);
      
      // Pass userId as null since this is a public registration
      const result = await AffiliateService.createAffiliate(null, email, name);
      
      if (!result.success) {
        return res.status(400).json(result);
      }
      
      return res.status(201).json({
        success: true,
        message: result.message || 'Affiliate account created successfully',
        affiliate: {
          code: result.affiliate.affiliateCode,
          link: result.affiliate.referralLink,
          dashboardToken: result.affiliate.dashboardToken
        },
        isExisting: result.isExisting || false
      });
    } catch (error) {
      winston.error('Register affiliate error:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to register affiliate',
        details: error.message 
      });
    }
  },

  // Get dashboard data (token already authenticated)
  async getDashboard(req, res) {
    try {
      const result = await AffiliateService.getDashboardData(req.affiliateId);
      
      if (!result.success) {
        return res.status(400).json(result);
      }
      
      return res.status(200).json(result);
    } catch (error) {
      winston.error('Get dashboard error:', error);
      return res.status(500).json({ success: false, error: 'Failed to fetch dashboard data' });
    }
  },

  // Get earnings summary
  async getEarnings(req, res) {
    try {
      const result = await AffiliateService.getEarnings(req.affiliateId);
      
      if (!result.success) {
        return res.status(400).json(result);
      }
      
      return res.status(200).json(result);
    } catch (error) {
      winston.error('Get earnings error:', error);
      return res.status(500).json({ success: false, error: 'Failed to fetch earnings' });
    }
  },

  // Get referrals list
  async getReferrals(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;
      
      const result = await AffiliateService.getReferrals(req.affiliateId, page, limit);
      
      if (!result.success) {
        return res.status(400).json(result);
      }
      
      return res.status(200).json(result);
    } catch (error) {
      winston.error('Get referrals error:', error);
      return res.status(500).json({ success: false, error: 'Failed to fetch referrals' });
    }
  },

  // Get campaigns
  async getCampaigns(req, res) {
    try {
      const result = await AffiliateService.getCampaigns(req.affiliateId);
      
      if (!result.success) {
        return res.status(400).json(result);
      }
      
      return res.status(200).json(result);
    } catch (error) {
      winston.error('Get campaigns error:', error);
      return res.status(500).json({ success: false, error: 'Failed to fetch campaigns' });
    }
  },

  // Create campaign
  async createCampaign(req, res) {
    try {
      const result = await AffiliateService.createCampaign(req.affiliateId, req.body);
      
      if (!result.success) {
        return res.status(400).json(result);
      }
      
      return res.status(201).json(result);
    } catch (error) {
      winston.error('Create campaign error:', error);
      return res.status(500).json({ success: false, error: 'Failed to create campaign' });
    }
  },

  // Update bank details
  async updateBankDetails(req, res) {
    try {
      const result = await AffiliateService.updateBankDetails(req.affiliateId, req.body);
      
      if (!result.success) {
        return res.status(400).json(result);
      }
      
      return res.status(200).json(result);
    } catch (error) {
      winston.error('Update bank details error:', error);
      return res.status(500).json({ success: false, error: 'Failed to update bank details' });
    }
  },

  // Get bank details
  async getBankDetails(req, res) {
    try {
      const affiliate = req.affiliate;
      
      return res.status(200).json({
        success: true,
        data: {
          bankDetails: affiliate.bankDetails || null,
          isVerified: affiliate.isVerified || false,
          hasBankDetails: !!(affiliate.bankDetails?.accountNumber && affiliate.bankDetails?.bankCode),
        },
      });
    } catch (error) {
      winston.error('Get bank details error:', error);
      return res.status(500).json({ success: false, error: 'Failed to fetch bank details' });
    }
  },

  // Request payout
  async requestPayout(req, res) {
    try {
      const { amount } = req.body;
      
      if (!amount || amount <= 0) {
        return res.status(400).json({ 
          success: false, 
          error: 'Valid amount is required' 
        });
      }
      
      const result = await AffiliateService.requestPayout(req.affiliateId, amount);
      
      if (!result.success) {
        return res.status(400).json(result);
      }
      
      return res.status(200).json(result);
    } catch (error) {
      winston.error('Request payout error:', error);
      return res.status(500).json({ success: false, error: 'Failed to request payout' });
    }
  },

  // Get payout history (placeholder)
  async getPayoutHistory(req, res) {
    return res.status(200).json({
      success: true,
      data: [],
    });
  }
};

module.exports = affiliateController;