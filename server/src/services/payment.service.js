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

/**
 * Handle affiliate commission when purchase is completed - PERMANENT FIX
 */
async function handleAffiliateCommission(purchase) {
  try {
    // Get affiliate code from multiple possible sources
    let affiliateCode = purchase.affiliateCode || 
                        purchase.metadata?.affiliateCode || 
                        purchase.metadata?.affiliate ||
                        (purchase.affiliate && purchase.affiliate.affiliateCode);
    
    if (!affiliateCode) {
      winston.info('ℹ️ No affiliate code found for purchase:', purchase._id);
      return; // No affiliate for this purchase
    }
    
    winston.info(`🎯 Processing affiliate commission for code: ${affiliateCode}`, {
      purchaseId: purchase._id,
      amount: purchase.amount
    });
    
    const affiliate = await Affiliate.findOne({ 
      affiliateCode: affiliateCode.toString().toUpperCase(),
      isActive: true 
    });
    
    if (!affiliate) {
      winston.warn(`❌ Affiliate not found for code: ${affiliateCode}`);
      return;
    }
    
    // Calculate commission (50% of purchase amount)
    const commissionRate = 0.5; // 50% fixed rate
    const commissionAmount = purchase.amount * commissionRate;
    
    winston.info(`💰 Commission calculation:`, {
      purchaseAmount: purchase.amount,
      commissionRate,
      commissionAmount
    });
    
    // Initialize fields if they don't exist
    if (typeof affiliate.totalEarnings !== 'number') affiliate.totalEarnings = 0;
    if (typeof affiliate.pendingEarnings !== 'number') affiliate.pendingEarnings = 0;
    if (typeof affiliate.totalReferrals !== 'number') affiliate.totalReferrals = 0;
    if (typeof affiliate.successfulReferrals !== 'number') affiliate.successfulReferrals = 0;
    
    // Update affiliate stats
    affiliate.totalEarnings += commissionAmount;
    affiliate.pendingEarnings += commissionAmount;
    affiliate.totalReferrals += 1;
    affiliate.successfulReferrals += 1;
    
    // Initialize arrays if they don't exist
    if (!affiliate.referrals) affiliate.referrals = [];
    if (!affiliate.sales) affiliate.sales = [];
    
    // Add to referrals list
    affiliate.referrals.push({
      purchaseId: purchase._id,
      amount: purchase.amount,
      commission: commissionAmount,
      status: 'completed',
      date: new Date()
    });
    
    // Add to sales list
    affiliate.sales.push({
      purchaseId: purchase._id,
      amount: purchase.amount,
      commission: commissionAmount,
      date: new Date(),
      status: 'pending'
    });
    
    // Update conversion rate
    if (affiliate.clicks > 0) {
      affiliate.conversionRate = ((affiliate.successfulReferrals || 0) / affiliate.clicks) * 100;
    }
    
    // Save affiliate
    await affiliate.save();
    
    // Update purchase with affiliate info
    purchase.affiliate = {
      affiliateCode: affiliate.affiliateCode,
      commissionAmount: commissionAmount,
      commissionRate: commissionRate,
      isPaid: false
    };
    await purchase.save();
    
    winston.info('✅ Affiliate commission recorded successfully:', {
      affiliateCode: affiliate.affiliateCode,
      purchaseId: purchase._id,
      commissionAmount,
      totalEarnings: affiliate.totalEarnings,
      pendingEarnings: affiliate.pendingEarnings,
      totalReferrals: affiliate.totalReferrals
    });
    
    // Send commission notification email
    try {
      const user = await User.findById(affiliate.user);
      if (user && user.email) {
        await emailService.sendAffiliateCommissionEmail(
          user.email,
          user.name || 'Affiliate',
          purchase,
          commissionAmount
        );
        winston.info('✅ Commission email sent to:', user.email);
      }
    } catch (emailError) {
      winston.error('❌ Failed to send commission email:', emailError);
    }
    
  } catch (error) {
    winston.error('❌ Affiliate commission error:', error);
    // Don't throw - we don't want to fail the payment if affiliate tracking fails
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
      
      // Ensure metadata includes affiliate code
      const enrichedMetadata = {
        ...metadata,
        originalEbookIdentifier: ebookIdentifier,
        affiliateCode: affiliateCode, // Store affiliate code in metadata
      };
      
      const purchase = new Purchase({
        user: userId,
        ebook: ebook._id,
        amount: amount,
        currency: currency,
        paymentMethod: 'paystack',
        status: 'pending',
        transactionReference: tempRef,
        affiliateCode: affiliateCode || null, // Store affiliate code directly
        metadata: enrichedMetadata,
      });
      
      await purchase.save();
      winston.info('✅ Purchase created:', { 
        purchaseId: purchase._id, 
        currency, 
        tempRef,
        hasAffiliate: !!affiliateCode 
      });
      
      // Initialize Paystack payment
      return await this.initializePaystackPayment(user, ebook, purchase, amount, currency, enrichedMetadata);
      
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
        ebookTitle: ebook.title,
        hasAffiliate: !!metadata.affiliateCode
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
        hasAffiliate: !!metadata.affiliateCode,
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

      // ✅ CRITICAL: Handle affiliate commission if applicable
      // Check multiple possible sources for affiliate code
      const hasAffiliate = purchase.affiliateCode || 
                           purchase.metadata?.affiliateCode || 
                           purchase.metadata?.affiliate;
      
      if (hasAffiliate) {
        winston.info('🎯 Found affiliate for purchase, processing commission...');
        await handleAffiliateCommission(purchase);
      } else {
        winston.info('ℹ️ No affiliate found for this purchase');
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