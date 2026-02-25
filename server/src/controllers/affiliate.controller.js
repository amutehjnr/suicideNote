// controllers/affiliate.controller.js
const AffiliateService = require('../services/affiliate.service');
const Affiliate = require('../models/Affiliate.model');
const Purchase = require('../models/Purchase.model');
const winston = require('winston');

const affiliateController = {
  /**
   * Register as an affiliate
   */
  async registerAffiliate(req, res) {
    try {
      const result = await AffiliateService.createAffiliate(req.user._id);
      
      if (!result.success) {
        return res.status(400).json(result);
      }
      
      return res.status(201).json(result);
    } catch (error) {
      winston.error('Register affiliate error:', error);
      return res.status(500).json({ success: false, error: 'Failed to register affiliate' });
    }
  },

  /**
   * Get affiliate dashboard data
   */
  async getDashboard(req, res) {
    try {
      const result = await AffiliateService.getDashboardData(req.affiliate._id);
      
      if (!result.success) {
        return res.status(400).json(result);
      }
      
      return res.status(200).json(result);
    } catch (error) {
      winston.error('Get dashboard error:', error);
      return res.status(500).json({ success: false, error: 'Failed to fetch dashboard data' });
    }
  },

  /**
   * Track affiliate click (public)
   */
  async trackClick(req, res) {
    try {
      const { code } = req.params;
      const { campaign } = req.query;
      
      if (!code) {
        return res.status(400).json({ success: false, error: 'Affiliate code required' });
      }
      
      const affiliate = await Affiliate.findOne({ affiliateCode: code.toUpperCase() });
      
      if (!affiliate || !affiliate.isActive) {
        return res.status(404).json({ success: false, error: 'Affiliate not found' });
      }
      
      await affiliate.addClick(campaign);
      
      // Set cookie for 48 hours
      res.cookie('affiliate_ref', code.toUpperCase(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 48 * 60 * 60 * 1000,
      });
      
      if (campaign) {
        res.cookie('affiliate_campaign', campaign, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          maxAge: 48 * 60 * 60 * 1000,
        });
      }
      
      // Redirect to homepage
      return res.redirect('/');
    } catch (error) {
      winston.error('Track click error:', error);
      return res.redirect('/');
    }
  },

  /**
   * Get earnings summary
   */
  async getEarnings(req, res) {
    try {
      const affiliate = req.affiliate;
      
      const earnings = {
        total: {
          amount: affiliate.totalEarnings,
          formatted: affiliate.formattedTotalEarnings,
        },
        pending: {
          amount: affiliate.pendingEarnings,
          formatted: affiliate.formattedPendingEarnings,
        },
        paid: {
          amount: affiliate.paidEarnings,
          formatted: affiliate.formattedPaidEarnings,
        },
        thisMonth: await this.getEarningsThisMonth(affiliate._id),
        lastMonth: await this.getEarningsLastMonth(affiliate._id),
        byCampaign: affiliate.campaigns.map(c => ({
          name: c.name,
          earnings: c.earnings,
          conversions: c.conversions,
          clicks: c.clicks,
        })),
      };
      
      return res.status(200).json({
        success: true,
        data: earnings,
      });
    } catch (error) {
      winston.error('Get earnings error:', error);
      return res.status(500).json({ success: false, error: 'Failed to fetch earnings' });
    }
  },

  /**
   * Get referrals list
   */
  async getReferrals(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;
      const skip = (page - 1) * limit;
      
      const referrals = await Purchase.find({
        'affiliate.affiliateCode': req.affiliate.affiliateCode,
        status: 'completed',
      })
        .populate('user', 'name email')
        .populate('ebook', 'title')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
      
      const total = await Purchase.countDocuments({
        'affiliate.affiliateCode': req.affiliate.affiliateCode,
        status: 'completed',
      });
      
      const formattedReferrals = referrals.map(ref => ({
        id: ref._id,
        customer: ref.user?.name || ref.metadata?.guestName || 'Anonymous',
        email: ref.user?.email || ref.metadata?.guestEmail,
        ebook: ref.ebook?.title || 'Suicide Note',
        amount: ref.formattedAmount,
        commission: ref.formattedCommission,
        date: ref.createdAt,
        status: ref.status,
      }));
      
      return res.status(200).json({
        success: true,
        data: {
          referrals: formattedReferrals,
          pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
          },
        },
      });
    } catch (error) {
      winston.error('Get referrals error:', error);
      return res.status(500).json({ success: false, error: 'Failed to fetch referrals' });
    }
  },

  /**
   * Get performance report
   */
  async getPerformanceReport(req, res) {
    try {
      const { period = 'month' } = req.params;
      
      const result = await AffiliateService.getPerformanceReport(req.affiliate._id, period);
      
      if (!result.success) {
        return res.status(400).json(result);
      }
      
      return res.status(200).json(result);
    } catch (error) {
      winston.error('Get performance report error:', error);
      return res.status(500).json({ success: false, error: 'Failed to fetch performance report' });
    }
  },

  /**
   * Create campaign
   */
  async createCampaign(req, res) {
    try {
      const result = await AffiliateService.createCampaign(req.affiliate._id, req.body);
      
      if (!result.success) {
        return res.status(400).json(result);
      }
      
      return res.status(201).json(result);
    } catch (error) {
      winston.error('Create campaign error:', error);
      return res.status(500).json({ success: false, error: 'Failed to create campaign' });
    }
  },

  /**
   * Get all campaigns
   */
  async getCampaigns(req, res) {
    try {
      const affiliate = req.affiliate;
      
      const campaigns = affiliate.campaigns.map(c => ({
        name: c.name,
        link: c.link,
        clicks: c.clicks,
        conversions: c.conversions,
        earnings: c.earnings,
        formattedEarnings: this.formatCurrency(c.earnings),
        conversionRate: c.clicks > 0 ? (c.conversions / c.clicks * 100).toFixed(1) : 0,
        createdAt: c.createdAt,
      }));
      
      return res.status(200).json({
        success: true,
        data: campaigns,
      });
    } catch (error) {
      winston.error('Get campaigns error:', error);
      return res.status(500).json({ success: false, error: 'Failed to fetch campaigns' });
    }
  },

  /**
   * Get campaign analytics
   */
  async getCampaignAnalytics(req, res) {
    try {
      const { name } = req.params;
      
      const result = await AffiliateService.getCampaignAnalytics(req.affiliate._id, name);
      
      if (!result.success) {
        return res.status(400).json(result);
      }
      
      return res.status(200).json(result);
    } catch (error) {
      winston.error('Get campaign analytics error:', error);
      return res.status(500).json({ success: false, error: 'Failed to fetch campaign analytics' });
    }
  },

  /**
   * Update bank details
   */
  async updateBankDetails(req, res) {
    try {
      const result = await AffiliateService.updateBankDetails(req.affiliate._id, req.body);
      
      if (!result.success) {
        return res.status(400).json(result);
      }
      
      return res.status(200).json(result);
    } catch (error) {
      winston.error('Update bank details error:', error);
      return res.status(500).json({ success: false, error: 'Failed to update bank details' });
    }
  },

  /**
   * Get bank details
   */
  async getBankDetails(req, res) {
    try {
      const affiliate = req.affiliate;
      
      return res.status(200).json({
        success: true,
        data: {
          bankDetails: affiliate.bankDetails || null,
          isVerified: affiliate.isVerified,
          hasBankDetails: !!(affiliate.bankDetails?.accountNumber && affiliate.bankDetails?.bankCode),
        },
      });
    } catch (error) {
      winston.error('Get bank details error:', error);
      return res.status(500).json({ success: false, error: 'Failed to fetch bank details' });
    }
  },

  /**
   * Request payout - FIXED to use the service correctly
   */
  async requestPayout(req, res) {
    try {
      const { amount } = req.body;
      
      if (!amount || amount <= 0) {
        return res.status(400).json({ 
          success: false, 
          error: 'Valid amount is required' 
        });
      }
      
      const result = await AffiliateService.requestPayout(req.affiliate._id, amount);
      
      if (!result.success) {
        return res.status(400).json(result);
      }
      
      return res.status(200).json(result);
    } catch (error) {
      winston.error('Request payout error:', error);
      return res.status(500).json({ success: false, error: 'Failed to request payout' });
    }
  },

  /**
   * Get payout history
   */
  async getPayoutHistory(req, res) {
    try {
      const affiliate = req.affiliate;
      
      // In a real app, you'd have a Payout model
      // For now, return empty array
      
      return res.status(200).json({
        success: true,
        data: [],
      });
    } catch (error) {
      winston.error('Get payout history error:', error);
      return res.status(500).json({ success: false, error: 'Failed to fetch payout history' });
    }
  },

  /**
   * Update settings
   */
  async updateSettings(req, res) {
    try {
      const result = await AffiliateService.updateSettings(req.affiliate._id, req.body);
      
      if (!result.success) {
        return res.status(400).json(result);
      }
      
      return res.status(200).json(result);
    } catch (error) {
      winston.error('Update settings error:', error);
      return res.status(500).json({ success: false, error: 'Failed to update settings' });
    }
  },

  /**
   * Generate campaign link
   */
  async generateCampaignLink(req, res) {
    try {
      const { name, medium, source } = req.body;
      
      if (!name) {
        return res.status(400).json({ success: false, error: 'Campaign name required' });
      }
      
      const affiliate = req.affiliate;
      const link = affiliate.generateCampaignLink(name, medium, source);
      
      return res.status(200).json({
        success: true,
        data: {
          link,
          campaign: name,
          medium,
          source,
        },
      });
    } catch (error) {
      winston.error('Generate campaign link error:', error);
      return res.status(500).json({ success: false, error: 'Failed to generate campaign link' });
    }
  },

  /**
   * Get leaderboard
   */
  async getLeaderboard(req, res) {
    try {
      const { period = 'month', limit = 10 } = req.query;
      
      const result = await AffiliateService.getLeaderboard(parseInt(limit), period);
      
      if (!result.success) {
        return res.status(400).json(result);
      }
      
      return res.status(200).json(result);
    } catch (error) {
      winston.error('Get leaderboard error:', error);
      return res.status(500).json({ success: false, error: 'Failed to fetch leaderboard' });
    }
  },

  /**
   * Deactivate affiliate account
   */
  async deactivateAccount(req, res) {
    try {
      const result = await AffiliateService.deactivateAccount(req.affiliate._id);
      
      if (!result.success) {
        return res.status(400).json(result);
      }
      
      return res.status(200).json(result);
    } catch (error) {
      winston.error('Deactivate account error:', error);
      return res.status(500).json({ success: false, error: 'Failed to deactivate account' });
    }
  },

  /**
   * Test affiliate email (admin only)
   */
  async testAffiliateEmail(req, res) {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ success: false, error: 'Email is required' });
      }
      
      // Create a mock affiliate object
      const mockAffiliate = {
        affiliateCode: 'TEST123',
        referralLink: `${process.env.CLIENT_URL || 'https://suicidenote.onrender.com'}/?ref=TEST123`,
        commissionRate: 0.5
      };
      
      const emailService = require('../services/email.service');
      const result = await emailService.sendAffiliateWelcomeEmail(
        email,
        'Test User',
        mockAffiliate
      );
      
      return res.status(200).json({
        success: result,
        message: result ? '✅ Test email sent successfully' : '❌ Failed to send test email',
        email
      });
    } catch (error) {
      console.error('Test affiliate email error:', error);
      return res.status(500).json({ success: false, error: error.message });
    }
  },

  // Helper functions
  async getEarningsThisMonth(affiliateId) {
    const start = new Date();
    start.setDate(1);
    start.setHours(0, 0, 0, 0);
    
    const end = new Date();
    end.setMonth(end.getMonth() + 1);
    end.setDate(0);
    end.setHours(23, 59, 59, 999);
    
    const purchases = await Purchase.find({
      'affiliate.affiliateCode': (await Affiliate.findById(affiliateId)).affiliateCode,
      status: 'completed',
      createdAt: { $gte: start, $lte: end },
    });
    
    const earnings = purchases.reduce((sum, p) => sum + (p.affiliate?.commissionAmount || 0), 0);
    
    return {
      amount: earnings,
      formatted: this.formatCurrency(earnings),
    };
  },

  async getEarningsLastMonth(affiliateId) {
    const start = new Date();
    start.setMonth(start.getMonth() - 1);
    start.setDate(1);
    start.setHours(0, 0, 0, 0);
    
    const end = new Date();
    end.setDate(0);
    end.setHours(23, 59, 59, 999);
    
    const purchases = await Purchase.find({
      'affiliate.affiliateCode': (await Affiliate.findById(affiliateId)).affiliateCode,
      status: 'completed',
      createdAt: { $gte: start, $lte: end },
    });
    
    const earnings = purchases.reduce((sum, p) => sum + (p.affiliate?.commissionAmount || 0), 0);
    
    return {
      amount: earnings,
      formatted: this.formatCurrency(earnings),
    };
  },

  // Helper function to format currency
  formatCurrency(amount) {
    const formatter = new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    });
    return formatter.format(amount / 100);
  }
};

module.exports = affiliateController;