const axios = require('axios');
const mongoose = require('mongoose');
const User = require('../models/User.model');
const Purchase = require('../models/Purchase.model');
const Ebook = require('../models/Ebook.model');
const Affiliate = require('../models/Affiliate.model');
const winston = require('winston');
const crypto = require('crypto');
const AccessCode = require('../models/AccessCode.model');
const emailService = require('./email.service');

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_BASE_URL = 'https://api.paystack.co';

// Constants
const EBOOK_PRICE_NGN = 2500; // ₦2,500 (in kobo)
const EBOOK_PRICE_USD = 500; // $5.00 (in cents)

// Helper function to send access code email
async function sendAccessCodeEmail(purchase, accessCode) {
  try {
    console.log('📧 ===== SENDING ACCESS CODE EMAIL =====');
    console.log('📧 To:', purchase.user?.email);
    console.log('📧 Code:', accessCode.code);
    console.log('📧 Ebook:', purchase.ebook?.title);
    
    if (!purchase.user || !purchase.user.email) {
      console.log('❌ No user email found');
      return false;
    }
    
    const userName = purchase.user?.name || 
                     purchase.metadata?.guestName || 
                     purchase.metadata?.name ||
                     purchase.user?.email?.split('@')[0] || 
                     'Valued Reader';
    
    console.log('📧 User name resolved to:', userName);
    
    const result = await emailService.sendAccessCodeEmail(
      purchase.user.email,
      userName,
      accessCode.code,
      purchase.ebook
    );
    
    console.log('📧 Email send result:', result ? '✅ Success' : '❌ Failed');
    return result;
  } catch (error) {
    console.error('🔥 Email helper error:', error.message);
    return false;
  }
}

const paymentService = {
  /**
   * Initialize Payment (Paystack - supports both NGN and USD)
   */
  async initializePayment(userId, ebookIdentifier, affiliateCode, metadata, amount, currency = 'NGN') {
    try {
      winston.info('🚀 initializePayment called:', { 
        userId, 
        ebookIdentifier, 
        amount,
        currency,
        hasAffiliateCode: !!affiliateCode 
      });
      
      // Find ebook
      let ebook;
      
      if (mongoose.Types.ObjectId.isValid(ebookIdentifier)) {
        ebook = await Ebook.findById(ebookIdentifier);
      }
      
      if (!ebook) {
        ebook = await Ebook.findOne({
          $or: [
            { slug: ebookIdentifier },
            { customId: ebookIdentifier },
            { ebookId: ebookIdentifier }
          ]
        });
      }
      
      if (!ebook) {
        winston.error('❌ Ebook not found for identifier:', ebookIdentifier);
        return { success: false, error: 'Ebook not found' };
      }
      
      winston.info('✅ Found ebook:', { 
        id: ebook._id, 
        title: ebook.title, 
        price: ebook.price,
        currency 
      });
      
      // Get user
      const user = await User.findById(userId);
      if (!user) {
        return { success: false, error: 'User not found' };
      }
      
      // Create purchase record with a temporary reference
      const tempRef = `temp_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
      
      const purchase = new Purchase({
        user: userId,
        ebook: ebook._id,
        amount: amount,
        currency: currency,
        paymentMethod: 'paystack',
        status: 'pending',
        transactionReference: tempRef,
        affiliateCode: affiliateCode || null,
        metadata: {
          ...metadata,
          originalEbookIdentifier: ebookIdentifier,
        },
      });
      
      await purchase.save();
      winston.info('✅ Purchase created:', { purchaseId: purchase._id, currency, tempRef });
      
      // Initialize Paystack payment
      return await this.initializePaystackPayment(user, ebook, purchase, amount, currency, metadata);
      
    } catch (error) {
      winston.error('🔥 Initialize payment error:', error);
      return { 
        success: false, 
        error: 'Failed to initialize payment', 
        details: error.message 
      };
    }
  },

  /**
   * Initialize Paystack Payment (supports both NGN and USD)
   */
  async initializePaystackPayment(user, ebook, purchase, amount, currency, metadata) {
    try {
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
      const callbackUrl = `${frontendUrl}/thank-you`;
      
      // Paystack expects amount in smallest currency unit
      // For NGN: 2500 = ₦2,500 (kobo)
      // For USD: 500 = $5.00 (cents)
      
      const payload = {
        email: metadata.guestEmail || user.email,
        amount: amount,
        currency: currency,
        metadata: {
          purchaseId: purchase._id.toString(),
          ebookId: ebook._id.toString(),
          ebookTitle: ebook.title,
          affiliateCode: metadata.affiliateCode || '',
          userId: user._id.toString(),
          paymentMethod: 'paystack',
          currency: currency,
          guestEmail: metadata.guestEmail,
          guestName: metadata.guestName,
          ...metadata,
        },
        callback_url: callbackUrl,
      };

      winston.info('📤 Sending to Paystack:', {
        amount,
        currency,
        userEmail: payload.email,
        ebookTitle: ebook.title
      });

      const response = await axios.post(
        `${PAYSTACK_BASE_URL}/transaction/initialize`, 
        payload, 
        {
          headers: { 
            Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
            'Content-Type': 'application/json'
          },
        }
      );

      if (response.data.status !== true) {
        purchase.status = 'failed';
        await purchase.save();
        return { success: false, error: response.data.message };
      }

      // Update purchase with Paystack reference
      purchase.paystackReference = response.data.data.reference;
      purchase.transactionReference = response.data.data.reference;
      await purchase.save();

      winston.info('✅ Paystack payment initialized:', {
        purchaseId: purchase._id,
        reference: response.data.data.reference,
        currency: currency,
        url: response.data.data.authorization_url
      });

      return {
        success: true,
        data: {
          authorizationUrl: response.data.data.authorization_url,
          reference: response.data.data.reference,
          purchaseId: purchase._id,
          paymentMethod: 'paystack',
          currency: currency,
          ebook: {
            _id: ebook._id,
            title: ebook.title,
            price: ebook.price
          }
        },
      };
    } catch (error) {
      winston.error('🔥 Paystack initialization error:', error);
      purchase.status = 'failed';
      await purchase.save();
      return { 
        success: false, 
        error: 'Failed to initialize Paystack payment',
        details: error.response?.data?.message || error.message 
      };
    }
  },

  /**
   * Verify Payment (Paystack)
   */
  async verifyPayment(reference) {
    try {
      winston.info('🔍 Verifying payment with reference:', reference);
      
      if (!reference) {
        return { success: false, error: 'Payment reference is required' };
      }
      
      const purchase = await Purchase.findOne({ 
        $or: [
          { paystackReference: reference },
          { transactionReference: reference }
        ]
      }).populate('ebook').populate('user');
      
      if (!purchase) {
        return { success: false, error: 'Purchase not found' };
      }

      if (purchase.status === 'completed') {
        const existingAccessCode = await AccessCode.findOne({ purchase: purchase._id });
        return {
          success: true,
          data: {
            purchase: {
              _id: purchase._id,
              amount: purchase.amount,
              currency: purchase.currency,
              status: purchase.status,
              paidAt: purchase.paidAt,
              ebook: purchase.ebook,
              user: purchase.user
            },
            paymentStatus: purchase.status,
            accessCode: existingAccessCode?.code,
            alreadyVerified: true
          },
        };
      }

      // Verify with Paystack
      const response = await axios.get(
        `${PAYSTACK_BASE_URL}/transaction/verify/${reference}`, 
        {
          headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` },
        }
      );

      if (!response.data.status || response.data.data.status !== 'success') {
        purchase.status = 'failed';
        await purchase.save();
        return { success: false, error: 'Payment verification failed' };
      }

      // Prepare payment details from Paystack
      const paymentDetails = {
        authorizationCode: response.data.data.authorization?.authorization_code,
        cardType: response.data.data.authorization?.card_type,
        last4: response.data.data.authorization?.last4,
        bank: response.data.data.authorization?.bank,
        channel: response.data.data.channel,
        paidAt: new Date(response.data.data.paid_at),
        reference: response.data.data.reference,
      };

      return await this.completeSuccessfulPayment(purchase, paymentDetails);
      
    } catch (error) {
      winston.error('🔥 Paystack verification error:', error);
      return { 
        success: false, 
        error: 'Failed to verify Paystack payment',
        details: error.response?.data?.message || error.message 
      };
    }
  },

  /**
   * Complete successful payment
   */
  async completeSuccessfulPayment(purchase, paymentDetails) {
    try {
      // Check if access code already exists
      let accessCode = await AccessCode.findOne({ purchase: purchase._id });
      
      if (!accessCode) {
        // Create new access code
        accessCode = await AccessCode.create({
          code: `SN-${Date.now().toString(36).toUpperCase()}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`,
          user: purchase.user._id,
          ebook: purchase.ebook._id,
          purchase: purchase._id,
          expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
          isActive: true,
        });
      }

      // Send email
      const emailSent = await sendAccessCodeEmail(purchase, accessCode);

      // Update purchase
      purchase.status = 'completed';
      purchase.paidAt = new Date();
      purchase.accessCode = accessCode._id;
      purchase.paymentDetails = paymentDetails;
      purchase.completedAt = new Date();
      await purchase.save();

      // Update user's purchased ebooks
      if (purchase.user) {
        const user = await User.findById(purchase.user._id);
        if (user) {
          if (!user.purchasedEbooks) user.purchasedEbooks = [];
          if (!user.purchasedEbooks.includes(purchase.ebook._id)) {
            user.purchasedEbooks.push(purchase.ebook._id);
            await user.save();
          }
        }
      }

      // Handle affiliate commission if applicable
      if (purchase.affiliateCode) {
        await this.handleAffiliateCommission(purchase);
      }

      return {
        success: true,
        data: {
          purchase: {
            _id: purchase._id,
            amount: purchase.amount,
            currency: purchase.currency,
            status: purchase.status,
            paidAt: purchase.paidAt,
            ebook: purchase.ebook,
            user: purchase.user
          },
          paymentStatus: purchase.status,
          accessCode: accessCode.code,
          emailSent,
        },
      };
    } catch (error) {
      winston.error('🔥 Complete payment error:', error);
      return { success: false, error: 'Failed to complete payment' };
    }
  },

  /**
   * Handle affiliate commission
   */
  async handleAffiliateCommission(purchase) {
    try {
      const affiliate = await Affiliate.findOne({ affiliateCode: purchase.affiliateCode });
      if (!affiliate) return;

      const commissionRate = affiliate.commissionRate || 0.5; // 50% default
      const commissionAmount = purchase.amount * commissionRate;

      affiliate.earnings += commissionAmount;
      affiliate.totalSales += 1;
      
      if (!affiliate.sales) affiliate.sales = [];
      affiliate.sales.push({
        purchaseId: purchase._id,
        amount: purchase.amount,
        commission: commissionAmount,
        date: new Date(),
        status: 'pending',
      });
      
      await affiliate.save();

      winston.info('✅ Affiliate commission recorded:', {
        affiliateCode: purchase.affiliateCode,
        purchaseId: purchase._id,
        commissionAmount
      });
    } catch (error) {
      winston.error('❌ Affiliate commission error:', error);
    }
  },

  /**
   * Get all purchases for a user
   */
  async getUserPurchases(userId) {
    try {
      const purchases = await Purchase.find({ user: userId })
        .populate('ebook')
        .populate('accessCode')
        .sort({ createdAt: -1 });
      return { success: true, data: purchases };
    } catch (error) {
      winston.error('Get user purchases error:', error);
      return { success: false, error: 'Failed to fetch purchases', details: error.message };
    }
  },

  /**
   * Get single purchase by ID
   */
  async getPurchaseById(purchaseId, userId) {
    try {
      const purchase = await Purchase.findOne({ _id: purchaseId, user: userId })
        .populate('ebook')
        .populate('accessCode');
      if (!purchase) return { success: false, error: 'Purchase not found' };
      return { success: true, data: purchase };
    } catch (error) {
      winston.error('Get purchase by ID error:', error);
      return { success: false, error: 'Failed to fetch purchase', details: error.message };
    }
  },

  /**
   * Validate access code
   */
  async validateAccessCode(code, ebookId) {
    try {
      const accessCode = await AccessCode.findOne({ 
        code: code.toUpperCase(),
        ebook: ebookId,
        isActive: true 
      }).populate('ebook');
      
      if (!accessCode) {
        return { success: false, error: 'Invalid access code' };
      }
      
      if (new Date() > accessCode.expiresAt) {
        return { success: false, error: 'Access code has expired' };
      }
      
      return { 
        success: true, 
        data: {
          code: accessCode.code,
          ebook: accessCode.ebook,
          expiresAt: accessCode.expiresAt
        } 
      };
    } catch (error) {
      winston.error('Validate access code error:', error);
      return { success: false, error: 'Failed to validate access code' };
    }
  },

  /**
   * Get currency options for frontend
   */
  getCurrencyOptions() {
    return {
      NGN: {
        symbol: '₦',
        code: 'NGN',
        amount: EBOOK_PRICE_NGN,
        displayAmount: '2,500',
        paymentMethod: 'paystack',
        icon: '🇳🇬',
        description: 'Pay with Naira (Local cards, Bank Transfer, USSD)'
      },
      USD: {
        symbol: '$',
        code: 'USD',
        amount: EBOOK_PRICE_USD,
        displayAmount: '5.00',
        paymentMethod: 'paystack',
        icon: '🌍',
        description: 'Pay with Dollars (International cards via Paystack)'
      }
    };
  },
};

module.exports = paymentService;