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
   * Get earnings summary - FIXED with better error handling
   */
  async getEarnings(req, res) {
    try {
      console.log('📊 Fetching earnings for affiliate:', req.affiliate?.affiliateCode);
      
      const affiliate = req.affiliate;
      
      if (!affiliate) {
        return res.status(404).json({ success: false, error: 'Affiliate not found' });
      }
      
      // Safely get values with defaults
      const earnings = {
        total: {
          amount: affiliate.totalEarnings || 0,
          formatted: this.formatCurrency(affiliate.totalEarnings || 0),
        },
        pending: {
          amount: affiliate.pendingEarnings || 0,
          formatted: this.formatCurrency(affiliate.pendingEarnings || 0),
        },
        paid: {
          amount: affiliate.paidEarnings || 0,
          formatted: this.formatCurrency(affiliate.paidEarnings || 0),
        },
        thisMonth: await this.getEarningsThisMonth(affiliate._id).catch(() => ({ amount: 0, formatted: '₦0' })),
        lastMonth: await this.getEarningsLastMonth(affiliate._id).catch(() => ({ amount: 0, formatted: '₦0' })),
        byCampaign: (affiliate.campaigns || []).map(c => ({
          name: c.name || 'Unknown',
          earnings: c.earnings || 0,
          conversions: c.conversions || 0,
          clicks: c.clicks || 0,
        })),
      };
      
      console.log('✅ Earnings fetched successfully:', earnings);
      
      return res.status(200).json({
        success: true,
        data: earnings,
      });
    } catch (error) {
      console.error('❌ Get earnings error:', error);
      winston.error('Get earnings error:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch earnings',
        details: error.message 
      });
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
        amount: this.formatCurrency(ref.amount || 0),
        commission: this.formatCurrency(ref.affiliate?.commissionAmount || 0),
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
            pages: Math.ceil(total / limit) || 1,
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
      
      const campaigns = (affiliate.campaigns || []).map(c => ({
        name: c.name,
        link: c.link,
        clicks: c.clicks || 0,
        conversions: c.conversions || 0,
        earnings: c.earnings || 0,
        formattedEarnings: this.formatCurrency(c.earnings || 0),
        conversionRate: c.clicks > 0 ? ((c.conversions || 0) / c.clicks * 100).toFixed(1) : 0,
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
          isVerified: affiliate.isVerified || false,
          hasBankDetails: !!(affiliate.bankDetails?.accountNumber && affiliate.bankDetails?.bankCode),
        },
      });
    } catch (error) {
      winston.error('Get bank details error:', error);
      return res.status(500).json({ success: false, error: 'Failed to fetch bank details' });
    }
  },

  /**
   * Request payout
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
    try {
      const start = new Date();
      start.setDate(1);
      start.setHours(0, 0, 0, 0);
      
      const end = new Date();
      end.setMonth(end.getMonth() + 1);
      end.setDate(0);
      end.setHours(23, 59, 59, 999);
      
      const affiliate = await Affiliate.findById(affiliateId);
      if (!affiliate) return { amount: 0, formatted: '₦0' };
      
      const purchases = await Purchase.find({
        'affiliate.affiliateCode': affiliate.affiliateCode,
        status: 'completed',
        createdAt: { $gte: start, $lte: end },
      });
      
      const earnings = purchases.reduce((sum, p) => sum + (p.affiliate?.commissionAmount || 0), 0);
      
      return {
        amount: earnings,
        formatted: this.formatCurrency(earnings),
      };
    } catch (error) {
      console.error('Error getting this month earnings:', error);
      return { amount: 0, formatted: '₦0' };
    }
  },

  async getEarningsLastMonth(affiliateId) {
    try {
      const start = new Date();
      start.setMonth(start.getMonth() - 1);
      start.setDate(1);
      start.setHours(0, 0, 0, 0);
      
      const end = new Date();
      end.setDate(0);
      end.setHours(23, 59, 59, 999);
      
      const affiliate = await Affiliate.findById(affiliateId);
      if (!affiliate) return { amount: 0, formatted: '₦0' };
      
      const purchases = await Purchase.find({
        'affiliate.affiliateCode': affiliate.affiliateCode,
        status: 'completed',
        createdAt: { $gte: start, $lte: end },
      });
      
      const earnings = purchases.reduce((sum, p) => sum + (p.affiliate?.commissionAmount || 0), 0);
      
      return {
        amount: earnings,
        formatted: this.formatCurrency(earnings),
      };
    } catch (error) {
      console.error('Error getting last month earnings:', error);
      return { amount: 0, formatted: '₦0' };
    }
  },

  // Helper function to format currency
  formatCurrency(amount) {
    if (amount === undefined || amount === null) return '₦0';
    
    try {
      const formatter = new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
      return formatter.format(amount / 100).replace('NGN', '₦');
    } catch (error) {
      return '₦0';
    }
  }
};

module.exports = affiliateController;