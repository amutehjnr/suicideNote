const Affiliate = require('../models/Affiliate.model');
const User = require('../models/User.model');
const Purchase = require('../models/Purchase.model');
const paystackService = require('../config/paystack');
const emailService = require('./email.service');
const winston = require('winston');

// Helper function for currency formatting
const formatCurrency = (amount) => {
  if (amount === undefined || amount === null || isNaN(amount)) return '₦0';
  
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
};

class AffiliateService {
  // Create new affiliate account (prevents duplicates)
  async createAffiliate(userId, email, name = '') {
    try {
      console.log('📝 Creating affiliate for:', { userId, email, name });
      
      // First check if affiliate already exists for this email
      let existingAffiliate = null;
      
      if (userId) {
        existingAffiliate = await Affiliate.findOne({ user: userId }).populate('user');
      }
      
      if (!existingAffiliate && email) {
        // Find user by email first
        const user = await User.findOne({ email: email.toLowerCase() });
        if (user) {
          existingAffiliate = await Affiliate.findOne({ user: user._id }).populate('user');
        }
      }
      
      if (existingAffiliate) {
  console.log('⚠️ Affiliate already exists:', existingAffiliate.affiliateCode);
  
  // CRITICAL FIX: Check if existing affiliate has a dashboard token
  if (!existingAffiliate.dashboardToken) {
    console.log('⚠️ Existing affiliate missing dashboard token, generating one...');
    existingAffiliate.dashboardToken = 'aff_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    await existingAffiliate.save();
    console.log('✅ Generated new dashboard token:', existingAffiliate.dashboardToken);
  } else {
    console.log('✅ Existing affiliate already has token:', existingAffiliate.dashboardToken);
  }
  
  // Send email with existing dashboard link
  await emailService.sendAffiliateWelcomeEmail(
    email || existingAffiliate.user?.email,
    name || existingAffiliate.user?.name || email?.split('@')[0] || 'Affiliate',
    existingAffiliate,
    true
  );
  
  return {
    success: true,
    message: 'Affiliate link already exists. Check your email.',
    affiliate: existingAffiliate,
    isExisting: true
  };
}
      
      // Find or create user
      let user = null;
      
      if (userId) {
        user = await User.findById(userId);
      }
      
      if (!user && email) {
        user = await User.findOne({ email: email.toLowerCase() });
      }
      
      if (!user && email) {
        // Create a new user
        user = new User({
          email: email.toLowerCase(),
          name: name || email.split('@')[0],
          password: Math.random().toString(36).slice(-12),
          isVerified: true,
          role: 'affiliate'
        });
        await user.save();
        console.log('✅ Created new user:', user.email);
      }
      
      if (!user) {
        return {
          success: false,
          error: 'User not found and email not provided',
        };
      }
      
      // Generate unique affiliate code
      let affiliateCode;
      let isUnique = false;
      let attempts = 0;
      
      while (!isUnique && attempts < 10) {
        affiliateCode = 'AFF' + Math.random().toString(36).substring(2, 8).toUpperCase();
        const existing = await Affiliate.findOne({ affiliateCode });
        if (!existing) isUnique = true;
        attempts++;
      }
      
      // Generate unique dashboard token
      const dashboardToken = 'aff_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      
      // Generate referral link
      const referralLink = `${process.env.CLIENT_URL || 'https://suicidenote.onrender.com'}/?ref=${affiliateCode}`;
      
      // Create affiliate record
      const affiliate = await Affiliate.create({
        user: user._id,
        affiliateCode,
        referralLink,
        dashboardToken,
        commissionRate: 0.5,
        isActive: true
      });
      
      // Update user role
      user.role = 'affiliate';
      user.affiliateId = affiliate._id;
      await user.save();
      
      console.log('✅ Affiliate created with token:', dashboardToken);
      
      // Send welcome email with dashboard link
      const emailResult = await emailService.sendAffiliateWelcomeEmail(
        user.email,
        user.name,
        affiliate,
        true
      );
      
      winston.info(`✅ Affiliate account created: ${user.email}, Code: ${affiliateCode}`);
      
      return {
        success: true,
        message: 'Affiliate account created successfully',
        affiliate,
        emailSent: emailResult,
        isExisting: false
      };
      
    } catch (error) {
      winston.error('❌ Create affiliate error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Get affiliate by dashboard token (no login required)
  async getAffiliateByToken(token) {
    try {
      const affiliate = await Affiliate.findOne({ 
        dashboardToken: token,
        isActive: true 
      }).populate('user', 'name email');
      
      if (!affiliate) {
        return {
          success: false,
          error: 'Invalid or expired dashboard link'
        };
      }
      
      return {
        success: true,
        data: affiliate
      };
      
    } catch (error) {
      winston.error('❌ Get affiliate by token error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Get affiliate dashboard data
  async getDashboardData(affiliateId) {
    try {
      const affiliate = await Affiliate.findById(affiliateId)
        .populate('user', 'name email profilePicture');
      
      if (!affiliate) {
        return {
          success: false,
          error: 'Affiliate not found',
        };
      }
      
      // Get recent referrals
      const recentReferrals = await Purchase.find({
        'affiliate.affiliateCode': affiliate.affiliateCode,
        status: 'completed',
      })
        .populate('user', 'name email')
        .populate('ebook', 'title coverImage')
        .sort({ createdAt: -1 })
        .limit(10);
      
      // Calculate conversion rate safely
      const conversionRate = affiliate.clicks > 0 
        ? ((affiliate.successfulReferrals || 0) / affiliate.clicks) * 100 
        : 0;
      
      const dashboardData = {
        affiliate: {
          code: affiliate.affiliateCode || '',
          link: affiliate.referralLink || '',
          dashboardToken: affiliate.dashboardToken,
          commissionRate: (affiliate.commissionRate || 0.5) * 100,
          isVerified: affiliate.isVerified || false,
          isActive: affiliate.isActive || false,
          createdAt: affiliate.createdAt || new Date(),
        },
        earnings: {
          total: affiliate.totalEarnings || 0,
          pending: affiliate.pendingEarnings || 0,
          paid: affiliate.paidEarnings || 0,
          formattedTotal: formatCurrency(affiliate.totalEarnings || 0),
          formattedPending: formatCurrency(affiliate.pendingEarnings || 0),
          formattedPaid: formatCurrency(affiliate.paidEarnings || 0),
        },
        stats: {
          totalClicks: affiliate.clicks || 0,
          totalReferrals: affiliate.totalReferrals || 0,
          successfulReferrals: affiliate.successfulReferrals || 0,
          conversionRate: conversionRate,
        },
        recentReferrals: recentReferrals || [],
        campaigns: affiliate.campaigns || [],
        payout: {
          canRequest: (affiliate.pendingEarnings || 0) >= (affiliate.paymentThreshold || 5000),
          nextAmount: (affiliate.pendingEarnings || 0) >= (affiliate.paymentThreshold || 5000) ? affiliate.pendingEarnings : 0,
          formattedNextAmount: formatCurrency(
            (affiliate.pendingEarnings || 0) >= (affiliate.paymentThreshold || 5000) ? affiliate.pendingEarnings : 0
          ),
          threshold: affiliate.paymentThreshold || 5000,
          formattedThreshold: formatCurrency(affiliate.paymentThreshold || 5000),
          bankDetailsSet: !!(affiliate.bankDetails?.accountNumber && affiliate.bankDetails?.bankCode),
        },
      };
      
      return {
        success: true,
        data: dashboardData,
      };
    } catch (error) {
      winston.error('Get dashboard data error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Get earnings summary
  async getEarnings(affiliateId) {
    try {
      const affiliate = await Affiliate.findById(affiliateId);
      
      if (!affiliate) {
        return {
          success: false,
          error: 'Affiliate not found'
        };
      }
      
      const earnings = {
        total: {
          amount: affiliate.totalEarnings || 0,
          formatted: formatCurrency(affiliate.totalEarnings || 0),
        },
        pending: {
          amount: affiliate.pendingEarnings || 0,
          formatted: formatCurrency(affiliate.pendingEarnings || 0),
        },
        paid: {
          amount: affiliate.paidEarnings || 0,
          formatted: formatCurrency(affiliate.paidEarnings || 0),
        },
        thisMonth: await this.getEarningsThisMonth(affiliate._id),
        lastMonth: await this.getEarningsLastMonth(affiliate._id),
        byCampaign: (affiliate.campaigns || []).map(c => ({
          name: c.name || 'Unknown',
          earnings: c.earnings || 0,
          conversions: c.conversions || 0,
          clicks: c.clicks || 0,
        })),
      };
      
      return {
        success: true,
        data: earnings,
      };
    } catch (error) {
      winston.error('Get earnings error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Get referrals
  async getReferrals(affiliateId, page = 1, limit = 20) {
    try {
      const affiliate = await Affiliate.findById(affiliateId);
      
      if (!affiliate) {
        return {
          success: false,
          error: 'Affiliate not found'
        };
      }
      
      const skip = (page - 1) * limit;
      
      const referrals = await Purchase.find({
        'affiliate.affiliateCode': affiliate.affiliateCode,
        status: 'completed',
      })
        .populate('user', 'name email')
        .populate('ebook', 'title')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
      
      const total = await Purchase.countDocuments({
        'affiliate.affiliateCode': affiliate.affiliateCode,
        status: 'completed',
      });
      
      const formattedReferrals = referrals.map(ref => ({
        id: ref._id,
        customer: ref.user?.name || ref.metadata?.guestName || 'Anonymous',
        email: ref.user?.email || ref.metadata?.guestEmail,
        ebook: ref.ebook?.title || 'Suicide Note',
        amount: formatCurrency(ref.amount || 0),
        commission: formatCurrency(ref.affiliate?.commissionAmount || 0),
        date: ref.createdAt,
        status: ref.status,
      }));
      
      return {
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
      };
    } catch (error) {
      winston.error('Get referrals error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Get campaigns
  async getCampaigns(affiliateId) {
    try {
      const affiliate = await Affiliate.findById(affiliateId);
      
      if (!affiliate) {
        return {
          success: false,
          error: 'Affiliate not found'
        };
      }
      
      const campaigns = (affiliate.campaigns || []).map(c => ({
        name: c.name,
        link: c.link,
        clicks: c.clicks || 0,
        conversions: c.conversions || 0,
        earnings: c.earnings || 0,
        formattedEarnings: formatCurrency(c.earnings || 0),
        conversionRate: c.clicks > 0 ? ((c.conversions || 0) / c.clicks * 100).toFixed(1) : 0,
        createdAt: c.createdAt,
      }));
      
      return {
        success: true,
        data: campaigns,
      };
    } catch (error) {
      winston.error('Get campaigns error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Create campaign
  async createCampaign(affiliateId, campaignData) {
    try {
      const affiliate = await Affiliate.findById(affiliateId);
      
      if (!affiliate) {
        return {
          success: false,
          error: 'Affiliate not found',
        };
      }
      
      const { name, description, medium, source } = campaignData;
      
      // Check if campaign already exists
      const existingCampaign = affiliate.campaigns.find(c => c.name === name);
      
      if (existingCampaign) {
        return {
          success: false,
          error: 'Campaign with this name already exists',
        };
      }
      
      // Generate campaign link
      const campaignLink = affiliate.generateCampaignLink(name, medium, source);
      
      // Add campaign
      affiliate.campaigns.push({
        name,
        description: description || '',
        link: campaignLink,
        clicks: 0,
        conversions: 0,
        earnings: 0,
        createdAt: new Date(),
      });
      
      await affiliate.save();
      
      return {
        success: true,
        message: 'Campaign created successfully',
        data: {
          name,
          link: campaignLink,
          createdAt: new Date(),
        },
      };
    } catch (error) {
      winston.error('Create campaign error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Update bank details
  async updateBankDetails(affiliateId, bankDetails) {
    try {
      const affiliate = await Affiliate.findById(affiliateId);
      
      if (!affiliate) {
        return {
          success: false,
          error: 'Affiliate not found',
        };
      }
      
      affiliate.bankDetails = bankDetails;
      affiliate.isVerified = true;
      await affiliate.save();
      
      return {
        success: true,
        message: 'Bank details updated successfully',
        data: {
          bankDetails: affiliate.bankDetails,
          isVerified: affiliate.isVerified,
        },
      };
    } catch (error) {
      winston.error('Update bank details error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Request payout
  async requestPayout(affiliateId, amount) {
    try {
      const affiliate = await Affiliate.findById(affiliateId)
        .populate('user');
      
      if (!affiliate) {
        return {
          success: false,
          error: 'Affiliate not found',
        };
      }
      
      // Validate amount
      if (amount < affiliate.paymentThreshold) {
        return {
          success: false,
          error: `Minimum payout amount is ${formatCurrency(affiliate.paymentThreshold)}`,
        };
      }
      
      if (amount > affiliate.pendingEarnings) {
        return {
          success: false,
          error: 'Insufficient pending earnings',
        };
      }
      
      if (!affiliate.bankDetails?.accountNumber) {
        return {
          success: false,
          error: 'Bank details not set up',
        };
      }
      
      // Update affiliate earnings
      affiliate.pendingEarnings -= amount;
      affiliate.paidEarnings += amount;
      await affiliate.save();
      
      // Send payout confirmation email
      await emailService.sendPayoutConfirmationEmail(
        affiliate.user.email,
        affiliate.user.name,
        amount,
        'PAYOUT-' + Date.now()
      );
      
      return {
        success: true,
        message: 'Payout requested successfully',
        data: {
          amount,
          newPending: affiliate.pendingEarnings,
          newPaid: affiliate.paidEarnings,
        },
      };
    } catch (error) {
      winston.error('Request payout error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Helper methods
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
        formatted: formatCurrency(earnings),
      };
    } catch (error) {
      return { amount: 0, formatted: '₦0' };
    }
  }

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
        formatted: formatCurrency(earnings),
      };
    } catch (error) {
      return { amount: 0, formatted: '₦0' };
    }
  }
}

module.exports = new AffiliateService();