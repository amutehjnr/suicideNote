const User = require('../models/User.model');
const Ebook = require('../models/Ebook.model');
const AccessCode = require('../models/AccessCode.model');
const Purchase = require('../models/Purchase.model');
const Affiliate = require('../models/Affiliate.model');
const crypto = require('crypto');
const emailService = require('../services/email.service');
const winston = require('winston');

const adminController = {
  /**
   * Get complete dashboard statistics
   */
  async getDashboardStats(req, res) {
  try {
    // Date ranges
    const now = new Date();
    const today = new Date(now.setHours(0, 0, 0, 0));
    const thisWeek = new Date(now.setDate(now.getDate() - 7));
    const thisMonth = new Date(now.setMonth(now.getMonth() - 1));
    
    // Parallel queries with error handling
    const [
      totalUsers,
      totalPurchases,
      totalRevenueResult,
      totalAffiliates,
      totalAccessCodes,
      todayStats,
      weeklyStats,
      monthlyStats,
      recentTransactions,
      recentAccessCodes,
      topEbooks,
      topAffiliates,
      paymentMethods
    ] = await Promise.all([
      User.countDocuments({}).catch(err => 0),
      Purchase.countDocuments({ status: 'completed' }).catch(err => 0),
      Purchase.aggregate([
        { $match: { status: 'completed' } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]).catch(err => []),
      Affiliate.countDocuments({}).catch(err => 0),
      AccessCode.countDocuments({}).catch(err => 0),

      // Today's stats
      Purchase.aggregate([
        { $match: { status: 'completed', createdAt: { $gte: today } } },
        { $group: { _id: null, count: { $sum: 1 }, revenue: { $sum: '$amount' } } }
      ]).catch(err => []),

      // Weekly stats
      Purchase.aggregate([
        { $match: { status: 'completed', createdAt: { $gte: thisWeek } } },
        { $group: { _id: null, count: { $sum: 1 }, revenue: { $sum: '$amount' } } }
      ]).catch(err => []),

      // Monthly stats
      Purchase.aggregate([
        { $match: { status: 'completed', createdAt: { $gte: thisMonth } } },
        { $group: { _id: null, count: { $sum: 1 }, revenue: { $sum: '$amount' } } }
      ]).catch(err => []),

      // Recent transactions
      Purchase.find({ status: 'completed' })
        .populate('user', 'email name')
        .populate('ebook', 'title price')
        .sort({ createdAt: -1 })
        .limit(10)
        .lean()
        .catch(err => []),

      // Recent access codes
      AccessCode.find({})
        .populate('user', 'email name')
        .populate('ebook', 'title')
        .populate('grantedBy', 'email')
        .sort({ createdAt: -1 })
        .limit(10)
        .lean()
        .catch(err => []),

      // Top selling ebooks
      Purchase.aggregate([
        { $match: { status: 'completed' } },
        { $group: { _id: '$ebook', count: { $sum: 1 }, revenue: { $sum: '$amount' } } },
        { $sort: { count: -1 } },
        { $limit: 5 },
        { $lookup: { from: 'ebooks', localField: '_id', foreignField: '_id', as: 'ebook' } },
        { $unwind: { path: '$ebook', preserveNullAndEmptyArrays: true } }
      ]).catch(err => []),

      // Top affiliates
      Affiliate.find({})
        .populate('user', 'email name')
        .sort({ earnings: -1 })
        .limit(5)
        .lean()
        .catch(err => []),

      // Payment methods breakdown
      Purchase.aggregate([
        { $match: { status: 'completed', 'paymentDetails.channel': { $exists: true, $ne: null } } },
        { $group: { _id: '$paymentDetails.channel', count: { $sum: 1 }, total: { $sum: '$amount' } } }
      ]).catch(err => [])
    ]);

    // Calculate free vs paid access
    const freeAccessCodes = await AccessCode.countDocuments({ isFreeAccess: true }).catch(err => 0);
    const paidAccessCodes = totalAccessCodes - freeAccessCodes;

    // Get conversion rate
    const usersWithPurchases = await Purchase.distinct('user', { status: 'completed' }).catch(err => []);
    const conversionRate = totalUsers > 0 ? (usersWithPurchases.length / totalUsers * 100).toFixed(2) : 0;

    return res.status(200).json({
      success: true,
      data: {
        overview: {
          totalUsers,
          totalPurchases,
          totalRevenue: totalRevenueResult[0]?.total || 0,
          totalAffiliates,
          totalAccessCodes: {
            total: totalAccessCodes,
            paid: paidAccessCodes,
            free: freeAccessCodes
          },
          conversionRate: `${conversionRate}%`
        },
        timeStats: {
          today: {
            purchases: todayStats[0]?.count || 0,
            revenue: todayStats[0]?.revenue || 0
          },
          thisWeek: {
            purchases: weeklyStats[0]?.count || 0,
            revenue: weeklyStats[0]?.revenue || 0
          },
          thisMonth: {
            purchases: monthlyStats[0]?.count || 0,
            revenue: monthlyStats[0]?.revenue || 0
          }
        },
        recentTransactions,
        recentAccessCodes,
        topEbooks: topEbooks.filter(e => e.ebook), // Filter out null ebooks
        topAffiliates,
        paymentMethods: (paymentMethods || []).map(m => ({
          method: m._id || 'unknown',
          count: m.count,
          total: m.total
        }))
      }
    });

  } catch (error) {
    console.error('Get admin stats error:', error);
    winston.error('Get admin stats error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch admin stats',
      details: error.message 
    });
  }
},

  /**
   * Get all transactions with filtering
   */
  async getAllTransactions(req, res) {
  try {
    const { 
      page = 1, 
      limit = 20, 
      status, 
      startDate, 
      endDate, 
      email,
      minAmount,
      maxAmount 
    } = req.query;

    const query = {};

    // Apply filters
    if (status) query.status = status;
    if (email) {
      const user = await User.findOne({ email: new RegExp(email, 'i') }).catch(err => null);
      if (user) query.user = user._id;
    }
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }
    if (minAmount || maxAmount) {
      query.amount = {};
      if (minAmount) query.amount.$gte = Number(minAmount);
      if (maxAmount) query.amount.$lte = Number(maxAmount);
    }

    // Get transactions with pagination
    const transactions = await Purchase.find(query)
      .populate('user', 'email name')
      .populate('ebook', 'title price')
      .populate('accessCode')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .lean()
      .catch(err => []);

    const total = await Purchase.countDocuments(query).catch(err => 0);

    // Calculate summary
    const summary = await Purchase.aggregate([
      { $match: query },
      { $group: {
        _id: null,
        totalAmount: { $sum: '$amount' },
        avgAmount: { $avg: '$amount' },
        minAmount: { $min: '$amount' },
        maxAmount: { $max: '$amount' }
      }}
    ]).catch(err => []);

    return res.status(200).json({
      success: true,
      data: {
        transactions: transactions || [],
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / limit) || 1
        },
        summary: summary[0] || {
          totalAmount: 0,
          avgAmount: 0,
          minAmount: 0,
          maxAmount: 0
        }
      }
    });

  } catch (error) {
    console.error('Get transactions error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch transactions',
      details: error.message 
    });
  }
},

  /**
   * Get transaction details by ID
   */
  async getTransactionById(req, res) {
    try {
      const { id } = req.params;

      const transaction = await Purchase.findById(id)
        .populate('user', 'email name createdAt')
        .populate('ebook', 'title price slug')
        .populate('accessCode')
        .populate('affiliateCode');

      if (!transaction) {
        return res.status(404).json({ 
          success: false, 
          error: 'Transaction not found' 
        });
      }

      // Get related transactions from same user
      const userTransactions = await Purchase.find({ 
        user: transaction.user._id,
        _id: { $ne: id }
      })
        .populate('ebook', 'title')
        .limit(5);

      return res.status(200).json({
        success: true,
        data: {
          transaction,
          userTransactions
        }
      });

    } catch (error) {
      console.error('Get transaction error:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch transaction',
        details: error.message 
      });
    }
  },

  /**
   * Get all access codes with filtering
   */
  async getAllAccessCodes(req, res) {
  try {
    const { 
      page = 1, 
      limit = 20, 
      isActive, 
      isFreeAccess,
      email,
      ebookId,
      used 
    } = req.query;

    const query = {};

    // Apply filters
    if (isActive !== undefined) query.isActive = isActive === 'true';
    if (isFreeAccess !== undefined) query.isFreeAccess = isFreeAccess === 'true';
    if (ebookId) query.ebook = ebookId;
    if (used !== undefined) {
      if (used === 'true') {
        query.accessCount = { $gt: 0 };
      } else {
        query.accessCount = 0;
      }
    }
    
    if (email) {
      const user = await User.findOne({ email: new RegExp(email, 'i') }).catch(err => null);
      if (user) query.user = user._id;
    }

    const accessCodes = await AccessCode.find(query)
      .populate('user', 'email name')
      .populate('ebook', 'title slug')
      .populate('purchase')
      .populate('grantedBy', 'email')
      .populate('revokedBy', 'email')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .lean()
      .catch(err => []);

    const total = await AccessCode.countDocuments(query).catch(err => 0);

    // Get usage statistics
    const stats = await AccessCode.aggregate([
      { $match: query },
      { $group: {
        _id: null,
        totalAccesses: { $sum: '$accessCount' },
        avgAccesses: { $avg: '$accessCount' },
        expired: { 
          $sum: { 
            $cond: [{ $lt: ['$expiresAt', new Date()] }, 1, 0] 
          } 
        }
      }}
    ]).catch(err => []);

    return res.status(200).json({
      success: true,
      data: {
        accessCodes: accessCodes || [],
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / limit) || 1
        },
        stats: stats[0] || {
          totalAccesses: 0,
          avgAccesses: 0,
          expired: 0
        }
      }
    });

  } catch (error) {
    console.error('Get access codes error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch access codes',
      details: error.message 
    });
  }
},

  /**
   * Get access code details by ID
   */
  async getAccessCodeById(req, res) {
    try {
      const { id } = req.params;

      const accessCode = await AccessCode.findById(id)
        .populate('user', 'email name createdAt')
        .populate('ebook', 'title price slug')
        .populate('purchase')
        .populate('grantedBy', 'email name')
        .populate('revokedBy', 'email name');

      if (!accessCode) {
        return res.status(404).json({ 
          success: false, 
          error: 'Access code not found' 
        });
      }

      // Get access history if you track it
      // This would require a separate AccessLog model

      return res.status(200).json({
        success: true,
        data: accessCode
      });

    } catch (error) {
      console.error('Get access code error:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch access code',
        details: error.message 
      });
    }
  },

  /**
   * Get affiliate statistics
   */
  async getAffiliateStats(req, res) {
    try {
      const affiliates = await Affiliate.find({})
        .populate('user', 'email name')
        .sort({ earnings: -1 });

      // Calculate totals
      const totals = affiliates.reduce((acc, curr) => ({
        totalEarnings: acc.totalEarnings + (curr.earnings || 0),
        totalPayouts: acc.totalPayouts + (curr.totalPayouts || 0),
        totalClicks: acc.totalClicks + (curr.totalClicks || 0),
        totalConversions: acc.totalConversions || 0
      }), { totalEarnings: 0, totalPayouts: 0, totalClicks: 0, totalConversions: 0 });

      // Get affiliate sales
      const affiliateSales = await Purchase.aggregate([
        { $match: { 
          status: 'completed', 
          affiliateCode: { $exists: true, $ne: null } 
        }},
        { $group: {
          _id: '$affiliateCode',
          sales: { $sum: 1 },
          revenue: { $sum: '$amount' },
          commission: { $sum: { $multiply: ['$amount', 0.5] } } // 50% commission
        }},
        { $sort: { sales: -1 } },
        { $limit: 10 }
      ]);

      return res.status(200).json({
        success: true,
        data: {
          affiliates,
          totals,
          topAffiliateSales: affiliateSales
        }
      });

    } catch (error) {
      console.error('Get affiliate stats error:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch affiliate stats',
        details: error.message 
      });
    }
  },

  /**
   * Export data (CSV)
   */
  async exportData(req, res) {
    try {
      const { type, startDate, endDate } = req.query;
      const query = {};

      if (startDate || endDate) {
        query.createdAt = {};
        if (startDate) query.createdAt.$gte = new Date(startDate);
        if (endDate) query.createdAt.$lte = new Date(endDate);
      }

      let data = [];
      let filename = '';

      switch (type) {
        case 'transactions':
          data = await Purchase.find(query)
            .populate('user', 'email')
            .populate('ebook', 'title')
            .lean();
          filename = `transactions-${Date.now()}.csv`;
          break;

        case 'access-codes':
          data = await AccessCode.find(query)
            .populate('user', 'email')
            .populate('ebook', 'title')
            .lean();
          filename = `access-codes-${Date.now()}.csv`;
          break;

        case 'users':
          data = await User.find(query).lean();
          filename = `users-${Date.now()}.csv`;
          break;

        default:
          return res.status(400).json({ 
            success: false, 
            error: 'Invalid export type' 
          });
      }

      // Convert to CSV
      if (data.length === 0) {
        return res.status(404).json({ 
          success: false, 
          error: 'No data to export' 
        });
      }

      const headers = Object.keys(data[0]).join(',');
      const rows = data.map(row => 
        Object.values(row).map(val => 
          typeof val === 'object' ? JSON.stringify(val) : val
        ).join(',')
      );
      
      const csv = [headers, ...rows].join('\n');

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
      
      return res.status(200).send(csv);

    } catch (error) {
      console.error('Export error:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to export data',
        details: error.message 
      });
    }
  },

  /**
   * Send free access code to email (bypass payment)
   */
  async sendFreeAccessCode(req, res) {
    try {
      const { email, name, ebookId, message, expiryDays } = req.body;

      // Validation
      if (!email) {
        return res.status(400).json({ 
          success: false, 
          error: 'Email is required' 
        });
      }

      if (!ebookId) {
        return res.status(400).json({ 
          success: false, 
          error: 'Ebook ID is required' 
        });
      }

      // Find or create user
      let user = await User.findOne({ email: email.toLowerCase().trim() });
      let isNewUser = false;

      if (!user) {
        user = new User({
          email: email.toLowerCase().trim(),
          name: name || email.split('@')[0],
          password: crypto.randomBytes(24).toString('hex'),
          isVerified: true,
          role: 'user',
          isFreeAccessUser: true
        });
        await user.save();
        isNewUser = true;
        winston.info(`Created new user for free access: ${user.email}`);
      }

      // Find ebook
      const ebook = await Ebook.findById(ebookId);
      if (!ebook) {
        return res.status(404).json({ 
          success: false, 
          error: 'Ebook not found' 
        });
      }

      // Create purchase record (free)
      const purchase = new Purchase({
        user: user._id,
        ebook: ebook._id,
        amount: 0,
        status: 'completed',
        paidAt: new Date(),
        isFreeAccess: true,
        grantedBy: req.user._id,
        metadata: {
          grantedBy: req.user.email,
          grantedAt: new Date().toISOString(),
          message: message || 'Free access granted',
          isFreeAccess: true
        }
      });
      await purchase.save();

      // Generate access code
      const accessCode = await AccessCode.create({
        code: `FREE-${Date.now().toString(36).toUpperCase()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`,
        user: user._id,
        ebook: ebook._id,
        purchase: purchase._id,
        expiresAt: new Date(Date.now() + (expiryDays || 365) * 24 * 60 * 60 * 1000),
        isActive: true,
        isFreeAccess: true,
        grantedBy: req.user._id,
        accessCount: 0
      });

      // Send email with access code
      const emailResult = await emailService.sendFreeAccessEmail(
        user.email,
        user.name || user.email.split('@')[0],
        accessCode.code,
        ebook,
        message || 'Here is your complimentary access code'
      );

      // Update user's purchased ebooks
      if (!user.purchasedEbooks) {
        user.purchasedEbooks = [];
      }
      if (!user.purchasedEbooks.includes(ebook._id)) {
        user.purchasedEbooks.push(ebook._id);
        await user.save();
      }

      return res.status(200).json({
        success: true,
        message: `Free access code sent to ${email}`,
        data: {
          email: user.email,
          name: user.name,
          ebook: {
            _id: ebook._id,
            title: ebook.title
          },
          accessCode: accessCode.code,
          expiresAt: accessCode.expiresAt,
          emailSent: emailResult,
          isNewUser
        }
      });

    } catch (error) {
      console.error('Send free access error:', error);
      winston.error('Send free access error:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to send free access code',
        details: error.message 
      });
    }
  },

  /**
   * Bulk send free access codes
   */
  async bulkSendFreeAccess(req, res) {
    try {
      const { recipients, ebookId, message, expiryDays } = req.body;

      if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
        return res.status(400).json({ 
          success: false, 
          error: 'Recipients array is required' 
        });
      }

      if (!ebookId) {
        return res.status(400).json({ 
          success: false, 
          error: 'Ebook ID is required' 
        });
      }

      const ebook = await Ebook.findById(ebookId);
      if (!ebook) {
        return res.status(404).json({ 
          success: false, 
          error: 'Ebook not found' 
        });
      }

      const results = {
        total: recipients.length,
        successful: [],
        failed: []
      };

      for (const recipient of recipients) {
        try {
          const { email, name } = typeof recipient === 'string' 
            ? { email: recipient, name: recipient.split('@')[0] }
            : recipient;

          // Find or create user
          let user = await User.findOne({ email: email.toLowerCase().trim() });
          
          if (!user) {
            user = new User({
              email: email.toLowerCase().trim(),
              name: name || email.split('@')[0],
              password: crypto.randomBytes(24).toString('hex'),
              isVerified: true,
              role: 'user',
              isFreeAccessUser: true
            });
            await user.save();
          }

          // Create purchase record
          const purchase = new Purchase({
            user: user._id,
            ebook: ebook._id,
            amount: 0,
            status: 'completed',
            paidAt: new Date(),
            isFreeAccess: true,
            grantedBy: req.user._id,
            metadata: {
              grantedBy: req.user.email,
              grantedAt: new Date().toISOString(),
              message: message || 'Bulk free access granted'
            }
          });
          await purchase.save();

          // Generate access code
          const accessCode = await AccessCode.create({
            code: `FREE-${Date.now().toString(36).toUpperCase()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`,
            user: user._id,
            ebook: ebook._id,
            purchase: purchase._id,
            expiresAt: new Date(Date.now() + (expiryDays || 365) * 24 * 60 * 60 * 1000),
            isActive: true,
            isFreeAccess: true,
            grantedBy: req.user._id
          });

          // Send email
          await emailService.sendFreeAccessEmail(
            user.email,
            user.name,
            accessCode.code,
            ebook,
            message || 'Here is your complimentary access code'
          );

          // Update user's purchased ebooks
          if (!user.purchasedEbooks) user.purchasedEbooks = [];
          if (!user.purchasedEbooks.includes(ebook._id)) {
            user.purchasedEbooks.push(ebook._id);
            await user.save();
          }

          results.successful.push({
            email: user.email,
            accessCode: accessCode.code,
            success: true
          });

        } catch (recipientError) {
          results.failed.push({
            email: recipient.email || recipient,
            error: recipientError.message
          });
        }
      }

      return res.status(200).json({
        success: true,
        message: `Sent ${results.successful.length} of ${results.total} free access codes`,
        data: results
      });

    } catch (error) {
      console.error('Bulk send free access error:', error);
      winston.error('Bulk send free access error:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to send bulk free access codes',
        details: error.message 
      });
    }
  },

  /**
   * Get all free access grants
   */
  async getFreeAccessGrants(req, res) {
    try {
      const grants = await AccessCode.find({ isFreeAccess: true })
        .populate('user', 'email name')
        .populate('ebook', 'title slug')
        .populate('grantedBy', 'email name')
        .sort({ createdAt: -1 });

      return res.status(200).json({
        success: true,
        data: grants
      });

    } catch (error) {
      console.error('Get free access grants error:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch free access grants' 
      });
    }
  },

  /**
   * Revoke free access
   */
  async revokeFreeAccess(req, res) {
    try {
      const { accessCodeId } = req.params;

      const accessCode = await AccessCode.findById(accessCodeId);
      
      if (!accessCode) {
        return res.status(404).json({ 
          success: false, 
          error: 'Access code not found' 
        });
      }

      accessCode.isActive = false;
      accessCode.revokedAt = new Date();
      accessCode.revokedBy = req.user._id;
      await accessCode.save();

      return res.status(200).json({
        success: true,
        message: 'Access code revoked successfully',
        data: accessCode
      });

    } catch (error) {
      console.error('Revoke access error:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to revoke access code' 
      });
    }
  },

  /**
   * Get user details with their transactions and access codes
   */
  async getUserDetails(req, res) {
    try {
      const { userId } = req.params;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ 
          success: false, 
          error: 'User not found' 
        });
      }

      const [purchases, accessCodes, affiliate] = await Promise.all([
        Purchase.find({ user: userId })
          .populate('ebook')
          .sort({ createdAt: -1 }),
        AccessCode.find({ user: userId })
          .populate('ebook')
          .sort({ createdAt: -1 }),
        Affiliate.findOne({ user: userId })
      ]);

      return res.status(200).json({
        success: true,
        data: {
          user,
          purchases,
          accessCodes,
          affiliate
        }
      });

    } catch (error) {
      console.error('Get user details error:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch user details' 
      });
    }
  },

  /**
   * Manual refund processing
   */
  async processRefund(req, res) {
    try {
      const { purchaseId } = req.params;
      const { reason } = req.body;

      const purchase = await Purchase.findById(purchaseId)
        .populate('user')
        .populate('ebook');

      if (!purchase) {
        return res.status(404).json({ 
          success: false, 
          error: 'Purchase not found' 
        });
      }

      if (purchase.status !== 'completed') {
        return res.status(400).json({ 
          success: false, 
          error: 'Only completed purchases can be refunded' 
        });
      }

      // Update purchase
      purchase.status = 'refunded';
      purchase.refundProcessedAt = new Date();
      purchase.refundProcessedBy = req.user._id;
      purchase.refundReason = reason || 'Admin initiated refund';
      await purchase.save();

      // Deactivate access code
      if (purchase.accessCode) {
        await AccessCode.findByIdAndUpdate(purchase.accessCode, {
          isActive: false,
          revokedAt: new Date(),
          revokedBy: req.user._id,
          revokedReason: 'Refund processed'
        });
      }

      // Send refund confirmation email
      await emailService.sendRefundConfirmationEmail(
        purchase.user.email,
        purchase.user.name,
        purchase,
        reason || 'Admin initiated refund'
      );

      return res.status(200).json({
        success: true,
        message: 'Refund processed successfully',
        data: purchase
      });

    } catch (error) {
      console.error('Process refund error:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to process refund' 
      });
    }
  }
};

module.exports = adminController;