const Affiliate = require('../models/Affiliate.model');
const User = require('../models/User.model');
const Purchase = require('../models/Purchase.model');
const paystackService = require('../config/paystack');
const emailService = require('./email.service');
const winston = require('winston');
const { generateUniqueAffiliateCode, generateAffiliateLink, calculateCommission } = require('../utils/generateAffiliateLink');

class AffiliateService {
  // Create new affiliate account
  async createAffiliate(userId) {
    try {
      const user = await User.findById(userId);
      
      if (!user) {
        return {
          success: false,
          error: 'User not found',
        };
      }
      
      // Check if user is already an affiliate
      if (user.role === 'affiliate' && user.affiliateId) {
        const affiliate = await Affiliate.findById(user.affiliateId);
        return {
          success: true,
          message: 'Already an affiliate',
          affiliate,
        };
      }
      
      // Generate unique affiliate code
      const affiliateCode = await generateUniqueAffiliateCode();
      
      // Generate referral link
      const referralLink = generateAffiliateLink(affiliateCode);
      
      // Create affiliate record
      const affiliate = await Affiliate.create({
        user: userId,
        affiliateCode,
        referralLink,
        commissionRate: parseFloat(process.env.AFFILIATE_COMMISSION_RATE) || 0.5,
      });
      
      // Update user role and affiliate ID
      user.role = 'affiliate';
      user.affiliateId = affiliate._id;
      await user.save();
      
      // Send affiliate welcome email
      console.log(`📧 Attempting to send affiliate welcome email to: ${user.email}`);
      const emailResult = await emailService.sendAffiliateWelcomeEmail(user.email, user.name, affiliate);
      console.log(`📧 Email send result:`, emailResult ? '✅ Success' : '❌ Failed');
      
      winston.info(`Affiliate account created: ${user.email}, Code: ${affiliateCode}`);
      
      return {
        success: true,
        message: 'Affiliate account created successfully',
        affiliate,
        emailSent: emailResult
      };
    } catch (error) {
      winston.error('Create affiliate error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Get affiliate dashboard data
  // In services/affiliate.service.js - Update the getDashboardData function

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
        commissionRate: (affiliate.commissionRate || 0.5) * 100,
        isVerified: affiliate.isVerified || false,
        isActive: affiliate.isActive || false,
        createdAt: affiliate.createdAt || new Date(),
      },
      earnings: {
        total: affiliate.totalEarnings || 0,
        pending: affiliate.pendingEarnings || 0,
        paid: affiliate.paidEarnings || 0,
        formattedTotal: this.formatCurrency(affiliate.totalEarnings || 0),
        formattedPending: this.formatCurrency(affiliate.pendingEarnings || 0),
        formattedPaid: this.formatCurrency(affiliate.paidEarnings || 0),
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
        formattedNextAmount: this.formatCurrency(
          (affiliate.pendingEarnings || 0) >= (affiliate.paymentThreshold || 5000) ? affiliate.pendingEarnings : 0
        ),
        threshold: affiliate.paymentThreshold || 5000,
        formattedThreshold: this.formatCurrency(affiliate.paymentThreshold || 5000),
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

// Add this helper method to the AffiliateService object
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

  // Update affiliate settings
  async updateSettings(affiliateId, settings) {
    try {
      const affiliate = await Affiliate.findById(affiliateId);
      
      if (!affiliate) {
        return {
          success: false,
          error: 'Affiliate not found',
        };
      }
      
      // Update settings
      if (settings.notifications) {
        affiliate.notifications = {
          ...affiliate.notifications,
          ...settings.notifications,
        };
      }
      
      if (settings.settings) {
        affiliate.settings = {
          ...affiliate.settings,
          ...settings.settings,
        };
      }
      
      if (settings.paymentThreshold) {
        affiliate.paymentThreshold = settings.paymentThreshold;
      }
      
      await affiliate.save();
      
      return {
        success: true,
        message: 'Settings updated successfully',
        data: {
          notifications: affiliate.notifications,
          settings: affiliate.settings,
          paymentThreshold: affiliate.paymentThreshold,
        },
      };
    } catch (error) {
      winston.error('Update settings error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Create new campaign
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
      const campaignLink = this.generateCampaignLink(affiliate.affiliateCode, name, { medium, source });
      
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
      
      winston.info(`Campaign created: ${name} for affiliate ${affiliate.affiliateCode}`);
      
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

  // Get campaign analytics
  async getCampaignAnalytics(affiliateId, campaignName) {
    try {
      const affiliate = await Affiliate.findById(affiliateId);
      
      if (!affiliate) {
        return {
          success: false,
          error: 'Affiliate not found',
        };
      }
      
      const campaign = affiliate.campaigns.find(c => c.name === campaignName);
      
      if (!campaign) {
        return {
          success: false,
          error: 'Campaign not found',
        };
      }
      
      // Get purchases from this campaign
      const campaignPurchases = await Purchase.find({
        'affiliate.affiliateCode': affiliate.affiliateCode,
        'metadata.campaignName': campaignName,
        status: 'completed',
      })
        .populate('user', 'name email')
        .populate('ebook', 'title')
        .sort({ createdAt: -1 });
      
      // Calculate conversion rate
      const conversionRate = campaign.clicks > 0
        ? (campaign.conversions / campaign.clicks) * 100
        : 0;
      
      // Calculate average order value
      const avgOrderValue = campaign.conversions > 0
        ? campaign.earnings / campaign.conversions
        : 0;
      
      const analytics = {
        campaign: {
          name: campaign.name,
          description: campaign.description,
          link: campaign.link,
          createdAt: campaign.createdAt,
        },
        stats: {
          clicks: campaign.clicks,
          conversions: campaign.conversions,
          earnings: campaign.earnings,
          conversionRate,
          avgOrderValue,
          formattedEarnings: this.formatCurrency(campaign.earnings),
          formattedAvgOrderValue: this.formatCurrency(avgOrderValue),
        },
        recentPurchases: campaignPurchases.slice(0, 10),
        totalPurchases: campaignPurchases.length,
      };
      
      return {
        success: true,
        data: analytics,
      };
    } catch (error) {
      winston.error('Get campaign analytics error:', error);
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
      
      const { accountNumber, accountName, bankCode, bankName } = bankDetails;
      
      // Create Paystack transfer recipient
      const recipientResult = await paystackService.createTransferRecipient(
        accountName,
        accountNumber,
        bankCode
      );
      
      if (!recipientResult.success) {
        return {
          success: false,
          error: recipientResult.error,
        };
      }
      
      // Update affiliate bank details
      affiliate.bankDetails = {
        accountNumber,
        accountName,
        bankCode,
        bankName,
      };
      
      affiliate.paystackRecipientCode = recipientResult.data.recipient_code;
      affiliate.isVerified = true; // Mark as verified after adding bank details
      
      await affiliate.save();
      
      winston.info(`Bank details updated for affiliate ${affiliate.affiliateCode}`);
      
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

  // Request payout - FIXED VERSION with proper error handling and email
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
          error: `Minimum payout amount is ${this.formatCurrency(affiliate.paymentThreshold)}`,
        };
      }
      
      if (amount > affiliate.pendingEarnings) {
        return {
          success: false,
          error: 'Insufficient pending earnings',
        };
      }
      
      if (!affiliate.bankDetails?.accountNumber || !affiliate.paystackRecipientCode) {
        return {
          success: false,
          error: 'Bank details not set up',
        };
      }
      
      // Process payout via Paystack
      const payoutResult = await paystackService.initiateTransfer(
        affiliate.paystackRecipientCode,
        amount,
        `Affiliate commission payout for ${affiliate.affiliateCode}`
      );
      
      if (!payoutResult.success) {
        return {
          success: false,
          error: payoutResult.error,
        };
      }
      
      // Update affiliate earnings
      affiliate.pendingEarnings -= amount;
      affiliate.paidEarnings += amount;
      await affiliate.save();
      
      // Send payout confirmation email
      console.log(`📧 Sending payout confirmation email to: ${affiliate.user.email}`);
      const emailResult = await emailService.sendPayoutConfirmationEmail(
        affiliate.user.email,
        affiliate.user.name,
        amount,
        payoutResult.data.reference
      );
      console.log(`📧 Payout email result:`, emailResult ? '✅ Success' : '❌ Failed');
      
      winston.info(`Payout processed for affiliate ${affiliate.affiliateCode}: ${this.formatCurrency(amount)}`);
      
      return {
        success: true,
        message: 'Payout processed successfully',
        data: {
          amount,
          reference: payoutResult.data.reference,
          newPending: affiliate.pendingEarnings,
          newPaid: affiliate.paidEarnings,
          emailSent: emailResult
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

  // Get affiliate performance report
  async getPerformanceReport(affiliateId, period = 'month') {
    try {
      const affiliate = await Affiliate.findById(affiliateId);
      
      if (!affiliate) {
        return {
          success: false,
          error: 'Affiliate not found',
        };
      }
      
      let startDate;
      const endDate = new Date();
      
      switch (period) {
        case 'week':
          startDate = new Date();
          startDate.setDate(startDate.getDate() - 7);
          break;
        case 'month':
          startDate = new Date();
          startDate.setMonth(startDate.getMonth() - 1);
          break;
        case 'quarter':
          startDate = new Date();
          startDate.setMonth(startDate.getMonth() - 3);
          break;
        case 'year':
          startDate = new Date();
          startDate.setFullYear(startDate.getFullYear() - 1);
          break;
        default:
          startDate = new Date(affiliate.createdAt);
      }
      
      // Get purchases within period
      const purchases = await Purchase.find({
        'affiliate.affiliateCode': affiliate.affiliateCode,
        status: 'completed',
        createdAt: { $gte: startDate, $lte: endDate },
      })
        .populate('ebook', 'title')
        .sort({ createdAt: -1 });
      
      // Calculate metrics
      const totalSales = purchases.length;
      const totalRevenue = purchases.reduce((sum, purchase) => sum + purchase.amount, 0);
      const totalCommission = purchases.reduce((sum, purchase) => 
        sum + (purchase.affiliate?.commissionAmount || 0), 0
      );
      
      // Get daily breakdown
      const dailyBreakdown = {};
      purchases.forEach(purchase => {
        const date = purchase.createdAt.toISOString().split('T')[0];
        if (!dailyBreakdown[date]) {
          dailyBreakdown[date] = {
            date,
            sales: 0,
            revenue: 0,
            commission: 0,
          };
        }
        
        dailyBreakdown[date].sales += 1;
        dailyBreakdown[date].revenue += purchase.amount;
        dailyBreakdown[date].commission += purchase.affiliate?.commissionAmount || 0;
      });
      
      const dailyData = Object.values(dailyBreakdown).sort((a, b) => 
        new Date(a.date) - new Date(b.date)
      );
      
      // Calculate conversion metrics
      const clicks = affiliate.clicks;
      const conversions = totalSales;
      const conversionRate = clicks > 0 ? (conversions / clicks) * 100 : 0;
      const earningsPerClick = clicks > 0 ? totalCommission / clicks : 0;
      
      const report = {
        period: {
          start: startDate,
          end: endDate,
          label: period,
        },
        summary: {
          totalClicks: clicks,
          totalConversions: conversions,
          totalSales,
          totalRevenue,
          totalCommission,
          conversionRate,
          earningsPerClick,
          formattedRevenue: this.formatCurrency(totalRevenue),
          formattedCommission: this.formatCurrency(totalCommission),
        },
        dailyBreakdown: dailyData,
        topProducts: this.getTopProducts(purchases),
        recentActivity: purchases.slice(0, 10),
        campaigns: affiliate.campaigns.map(campaign => ({
          name: campaign.name,
          clicks: campaign.clicks,
          conversions: campaign.conversions,
          earnings: campaign.earnings,
          conversionRate: campaign.clicks > 0 ? (campaign.conversions / campaign.clicks) * 100 : 0,
        })),
      };
      
      return {
        success: true,
        data: report,
      };
    } catch (error) {
      winston.error('Get performance report error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Get leaderboard (top affiliates)
  async getLeaderboard(limit = 10, period = 'month') {
    try {
      let startDate;
      const endDate = new Date();
      
      switch (period) {
        case 'week':
          startDate = new Date();
          startDate.setDate(startDate.getDate() - 7);
          break;
        case 'month':
          startDate = new Date();
          startDate.setMonth(startDate.getMonth() - 1);
          break;
        case 'all':
          startDate = new Date(0); // Beginning of time
          break;
        default:
          startDate = new Date();
          startDate.setMonth(startDate.getMonth() - 1);
      }
      
      // Get all affiliates with their recent performance
      const affiliates = await Affiliate.find({ isActive: true })
        .populate('user', 'name profilePicture')
        .sort({ totalEarnings: -1 })
        .limit(limit);
      
      // For each affiliate, get their performance in the selected period
      const leaderboard = await Promise.all(
        affiliates.map(async (affiliate) => {
          const periodPurchases = await Purchase.find({
            'affiliate.affiliateCode': affiliate.affiliateCode,
            status: 'completed',
            createdAt: { $gte: startDate, $lte: endDate },
          });
          
          const periodEarnings = periodPurchases.reduce((sum, purchase) => 
            sum + (purchase.affiliate?.commissionAmount || 0), 0
          );
          
          const periodSales = periodPurchases.length;
          
          return {
            rank: 0, // Will be set after sorting
            affiliate: {
              code: affiliate.affiliateCode,
              user: affiliate.user,
              joinDate: affiliate.createdAt,
            },
            stats: {
              totalEarnings: affiliate.totalEarnings,
              pendingEarnings: affiliate.pendingEarnings,
              totalSales: affiliate.successfulReferrals,
              periodEarnings,
              periodSales,
              formattedTotalEarnings: this.formatCurrency(affiliate.totalEarnings),
              formattedPeriodEarnings: this.formatCurrency(periodEarnings),
            },
          };
        })
      );
      
      // Sort by period earnings and assign ranks
      leaderboard.sort((a, b) => b.stats.periodEarnings - a.stats.periodEarnings);
      leaderboard.forEach((item, index) => {
        item.rank = index + 1;
      });
      
      return {
        success: true,
        data: {
          period: {
            start: startDate,
            end: endDate,
            label: period,
          },
          leaderboard,
        },
      };
    } catch (error) {
      winston.error('Get leaderboard error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Deactivate affiliate account
  async deactivateAccount(affiliateId) {
    try {
      const affiliate = await Affiliate.findById(affiliateId);
      
      if (!affiliate) {
        return {
          success: false,
          error: 'Affiliate not found',
        };
      }
      
      // Deactivate affiliate
      affiliate.isActive = false;
      await affiliate.save();
      
      // Update user role
      await User.findByIdAndUpdate(affiliate.user, {
        role: 'user',
      });
      
      winston.info(`Affiliate account deactivated: ${affiliate.affiliateCode}`);
      
      return {
        success: true,
        message: 'Affiliate account deactivated successfully',
      };
    } catch (error) {
      winston.error('Deactivate account error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Reactivate affiliate account
  async reactivateAccount(affiliateId) {
    try {
      const affiliate = await Affiliate.findById(affiliateId);
      
      if (!affiliate) {
        return {
          success: false,
          error: 'Affiliate not found',
        };
      }
      
      // Reactivate affiliate
      affiliate.isActive = true;
      await affiliate.save();
      
      // Update user role
      await User.findByIdAndUpdate(affiliate.user, {
        role: 'affiliate',
      });
      
      winston.info(`Affiliate account reactivated: ${affiliate.affiliateCode}`);
      
      return {
        success: true,
        message: 'Affiliate account reactivated successfully',
      };
    } catch (error) {
      winston.error('Reactivate account error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Get all affiliates (admin)
  async getAllAffiliates(filters = {}) {
    try {
      const query = {};
      
      if (filters.isActive !== undefined) {
        query.isActive = filters.isActive;
      }
      
      if (filters.isVerified !== undefined) {
        query.isVerified = filters.isVerified;
      }
      
      const page = parseInt(filters.page) || 1;
      const limit = parseInt(filters.limit) || 20;
      const skip = (page - 1) * limit;
      
      const affiliates = await Affiliate.find(query)
        .populate('user', 'name email')
        .sort({ totalEarnings: -1 })
        .skip(skip)
        .limit(limit);
      
      const total = await Affiliate.countDocuments(query);
      
      // Calculate statistics
      const stats = {
        total: await Affiliate.countDocuments(),
        active: await Affiliate.countDocuments({ isActive: true }),
        verified: await Affiliate.countDocuments({ isVerified: true }),
        totalEarnings: await Affiliate.aggregate([
          { $group: { _id: null, total: { $sum: '$totalEarnings' } } },
        ]).then(result => result[0]?.total || 0),
        pendingPayouts: await Affiliate.aggregate([
          { $group: { _id: null, total: { $sum: '$pendingEarnings' } } },
        ]).then(result => result[0]?.total || 0),
      };
      
      return {
        success: true,
        data: {
          affiliates,
          stats,
          pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
          },
        },
      };
    } catch (error) {
      winston.error('Get all affiliates error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Helper function to format currency
  formatCurrency(amount) {
    const formatter = new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    });
    return formatter.format(amount / 100);
  }

  // Helper function to generate campaign link
  generateCampaignLink(affiliateCode, campaignName, params = {}) {
    const baseUrl = process.env.CLIENT_URL || 'https://suicidenote.com';
    const url = new URL(`${baseUrl}/?ref=${affiliateCode}`);
    
    url.searchParams.set('campaign', campaignName);
    
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        url.searchParams.set(key, value);
      }
    });
    
    return url.toString();
  }

  // Helper function to get top products
  getTopProducts(purchases) {
    const productMap = {};
    
    purchases.forEach(purchase => {
      const ebookId = purchase.ebook?._id?.toString();
      const ebookTitle = purchase.ebook?.title || 'Unknown';
      
      if (!productMap[ebookId]) {
        productMap[ebookId] = {
          id: ebookId,
          title: ebookTitle,
          sales: 0,
          revenue: 0,
          commission: 0,
        };
      }
      
      productMap[ebookId].sales += 1;
      productMap[ebookId].revenue += purchase.amount;
      productMap[ebookId].commission += purchase.affiliate?.commissionAmount || 0;
    });
    
    return Object.values(productMap)
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5);
  }
}

module.exports = new AffiliateService();