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
    
    const result = await emailService.sendAccessCodeEmail(
      purchase.user.email,
      purchase.user.name || purchase.user.email.split('@')[0],
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
   * Initialize Payment
   * @param {string} userId
   * @param {string} ebookIdentifier - This could be MongoDB _id, slug, or custom ID
   * @param {string} affiliateCode
   * @param {object} metadata
   * @param {number} amountKobo
   */
  async initializePayment(userId, ebookIdentifier, affiliateCode, metadata, amountKobo) {
    try {
      winston.info('🚀 initializePayment called:', { 
        userId, 
        ebookIdentifier, 
        amountKobo,
        hasAffiliateCode: !!affiliateCode 
      });
      
      let ebook;
      
      // First, try to find by MongoDB _id (if it's a valid ObjectId)
      if (mongoose.Types.ObjectId.isValid(ebookIdentifier)) {
        ebook = await Ebook.findById(ebookIdentifier);
        winston.info('🔍 Searching by MongoDB _id:', ebookIdentifier);
      }
      
      // If not found by _id, try to find by slug or custom ID field
      if (!ebook) {
        winston.info('🔍 Searching by custom fields for:', ebookIdentifier);
        ebook = await Ebook.findOne({
          $or: [
            { slug: ebookIdentifier },
            { customId: ebookIdentifier },
            { ebookId: ebookIdentifier },
            { identifier: ebookIdentifier },
            { productId: ebookIdentifier }
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
        price: ebook.price 
      });
      
      // Generate temporary reference
      const tempTransactionRef = `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      // Create a new purchase entry (pending)
      const purchase = new Purchase({
        user: userId,
        ebook: ebook._id,
        amount: amountKobo / 100, // store in Naira
        status: 'pending',
        affiliateCode: affiliateCode || null,
        metadata: {
          ...metadata,
          originalEbookIdentifier: ebookIdentifier,
        },
        transactionReference: tempTransactionRef,
      });
      await purchase.save();
      
      winston.info('✅ Purchase created:', { 
        purchaseId: purchase._id,
        tempReference: tempTransactionRef 
      });

      const user = await User.findById(userId);
      if (!user) {
        winston.error('❌ User not found for ID:', userId);
        return { success: false, error: 'User not found' };
      }

      // Get frontend URL for callback
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
      
      // ✅ CRITICAL FIX: Redirect to thank-you page with reference
      const callbackUrl = `${frontendUrl}/thank-you`;
      winston.info('🔗 Callback URL set to:', callbackUrl);
      
      const payload = {
        email: metadata.guestEmail || user.email,
        amount: amountKobo,
        metadata: {
          purchaseId: purchase._id.toString(),
          ebookId: ebook._id.toString(),
          ebookIdentifier: ebookIdentifier,
          affiliateCode: affiliateCode || '',
          userId: userId.toString(),
          ...metadata,
        },
        callback_url: callbackUrl, // This tells Paystack where to redirect after payment
      };

      winston.info('📤 Sending to Paystack:', {
        amountKobo,
        userEmail: payload.email,
        ebookTitle: ebook.title,
        callback_url: payload.callback_url
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
        winston.error('❌ Paystack initialization failed:', response.data.message);
        purchase.status = 'failed';
        await purchase.save();
        return { 
          success: false, 
          error: response.data.message || 'Paystack initialization failed' 
        };
      }

      // Update purchase with Paystack reference
      purchase.paystackReference = response.data.data.reference;
      purchase.transactionReference = response.data.data.reference;
      await purchase.save();

      winston.info('✅ Payment initialized successfully:', {
        purchaseId: purchase._id,
        reference: response.data.data.reference,
        authorizationUrl: response.data.data.authorization_url
      });

      return {
        success: true,
        data: {
          authorizationUrl: response.data.data.authorization_url,
          reference: response.data.data.reference,
          purchaseId: purchase._id,
          ebook: {
            _id: ebook._id,
            title: ebook.title,
            price: ebook.price
          }
        },
      };
    } catch (error) {
      winston.error('🔥 Initialize payment error:', {
        message: error.message,
        stack: error.stack,
        response: error.response?.data
      });
      return { 
        success: false, 
        error: 'Failed to initialize payment', 
        details: error.message,
        stack: error.stack 
      };
    }
  },

  /**
   * Verify Payment
   * @param {string} reference
   */
  async verifyPayment(reference) {
    try {
      winston.info('🔍 Verifying payment with reference:', reference);
      
      // Find purchase with populated fields
      const purchase = await Purchase.findOne({ 
        $or: [
          { paystackReference: reference },
          { transactionReference: reference }
        ]
      }).populate('ebook').populate('user');
      
      if (!purchase) {
        winston.error('❌ Purchase not found for reference:', reference);
        return { success: false, error: 'Purchase not found' };
      }

      // Check if already verified
      if (purchase.status === 'completed') {
        winston.info('✅ Payment already verified:', reference);
        
        const existingAccessCode = await AccessCode.findOne({ purchase: purchase._id });
        
        // Try to send email again if it wasn't sent before
        if (existingAccessCode) {
          await sendAccessCodeEmail(purchase, existingAccessCode);
        }
        
        return {
          success: true,
          data: {
            purchase: {
              _id: purchase._id,
              amount: purchase.amount,
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
        winston.error('❌ Payment verification failed:', response.data.message);
        return { 
          success: false, 
          error: response.data.message || 'Payment verification failed',
          data: response.data 
        };
      }

      // ✅ Create AccessCode record
      const accessCode = await AccessCode.create({
        code: `SN-${Date.now().toString(36).toUpperCase()}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`,
        user: purchase.user._id,
        ebook: purchase.ebook._id,
        purchase: purchase._id,
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
        isActive: true,
      });

      // ✅ Send email immediately after creating access code
      await sendAccessCodeEmail(purchase, accessCode);

      // ✅ Update purchase with AccessCode ObjectId
      purchase.status = 'completed';
      purchase.paidAt = new Date();
      purchase.accessCode = accessCode._id;
      
      if (response.data.data.authorization) {
        purchase.paymentDetails = {
          authorizationCode: response.data.data.authorization.authorization_code,
          cardType: response.data.data.authorization.card_type,
          last4: response.data.data.authorization.last4,
          bank: response.data.data.authorization.bank,
          channel: response.data.data.channel,
          paidAt: new Date(response.data.data.paid_at || new Date())
        };
      }
      
      await purchase.save();

      winston.info('✅ Payment verified successfully:', {
        purchaseId: purchase._id,
        status: purchase.status,
        accessCode: accessCode.code,
        email: purchase.user?.email
      });

      // Update user's purchased ebooks
      if (purchase.user) {
        try {
          const user = await User.findById(purchase.user._id);
          if (user) {
            if (!user.purchasedEbooks) {
              user.purchasedEbooks = [];
            }
            if (!user.purchasedEbooks.includes(purchase.ebook._id)) {
              user.purchasedEbooks.push(purchase.ebook._id);
              await user.save();
            }
          }
        } catch (userError) {
          winston.warn('Could not update user purchased ebooks:', userError.message);
        }
      }

      return {
        success: true,
        data: {
          purchase: {
            _id: purchase._id,
            amount: purchase.amount,
            status: purchase.status,
            paidAt: purchase.paidAt,
            ebook: purchase.ebook,
            user: purchase.user
          },
          paymentStatus: purchase.status,
          verifiedData: response.data.data,
          accessCode: accessCode.code,
          accessCodeId: accessCode._id
        },
      };
    } catch (error) {
      winston.error('🔥 Verify payment error:', {
        message: error.message,
        stack: error.stack,
        reference: reference
      });
      return { 
        success: false, 
        error: 'Failed to verify payment', 
        details: error.message,
        stack: error.stack 
      };
    }
  },

  /**
   * Get all purchases for a user
   */
  async getUserPurchases(userId) {
    try {
      const purchases = await Purchase.find({ user: userId })
        .populate('ebook')
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
      const purchase = await Purchase.findOne({ _id: purchaseId, user: userId }).populate('ebook');
      if (!purchase) return { success: false, error: 'Purchase not found' };
      return { success: true, data: purchase };
    } catch (error) {
      winston.error('Get purchase by ID error:', error);
      return { success: false, error: 'Failed to fetch purchase', details: error.message };
    }
  },

  /**
   * Validate access code for ebook
   */
  async validateAccessCode(code, userId, ebookId) {
    try {
      const purchase = await Purchase.findOne({ 
        user: userId, 
        ebook: ebookId, 
        status: 'completed' 
      });
      
      if (!purchase) return { success: false, error: 'Invalid access code or purchase not found' };
      
      if (purchase.accessCode && purchase.accessCode !== code) {
        return { success: false, error: 'Invalid access code' };
      }
      
      return { success: true, data: purchase };
    } catch (error) {
      winston.error('Validate access code error:', error);
      return { success: false, error: 'Failed to validate access code', details: error.message };
    }
  },

  /**
   * Request refund
   */
  async requestRefund(purchaseId, userId, reason) {
    try {
      const purchase = await Purchase.findOne({ _id: purchaseId, user: userId });
      if (!purchase) return { success: false, error: 'Purchase not found' };

      if (purchase.status !== 'completed') {
        return { success: false, error: 'Only completed purchases can be refunded' };
      }

      const purchaseDate = new Date(purchase.createdAt || purchase.paidAt);
      const daysSincePurchase = (new Date() - purchaseDate) / (1000 * 60 * 60 * 24);
      
      if (daysSincePurchase > 7) {
        return { success: false, error: 'Refund period has expired (7 days)' };
      }

      purchase.refundRequested = true;
      purchase.refundReason = reason || 'No reason provided';
      purchase.refundRequestedAt = new Date();
      await purchase.save();

      winston.info('Refund requested:', {
        purchaseId: purchase._id,
        userId,
        reason
      });

      return { success: true, message: 'Refund requested successfully', data: purchase };
    } catch (error) {
      winston.error('Request refund error:', error);
      return { success: false, error: 'Failed to request refund', details: error.message };
    }
  },

  /**
   * Process affiliate payout
   */
  async processAffiliatePayout(affiliateId, amount) {
    try {
      const affiliate = await Affiliate.findById(affiliateId);
      if (!affiliate) return { success: false, error: 'Affiliate not found' };

      const MIN_PAYOUT = 5000;
      if (amount < MIN_PAYOUT) {
        return { success: false, error: `Minimum payout amount is ₦${MIN_PAYOUT.toLocaleString()}` };
      }

      if (amount > affiliate.earnings) {
        return { success: false, error: 'Insufficient earnings' };
      }

      affiliate.earnings -= amount;
      affiliate.totalPayouts += amount;
      affiliate.lastPayoutDate = new Date();
      affiliate.payouts.push({
        amount,
        date: new Date(),
        status: 'pending'
      });
      
      await affiliate.save();

      winston.info('Affiliate payout processed:', {
        affiliateId,
        amount,
        remainingEarnings: affiliate.earnings
      });

      return { 
        success: true, 
        message: 'Payout processed successfully', 
        data: { 
          affiliateId, 
          amount,
          remainingEarnings: affiliate.earnings
        } 
      };
    } catch (error) {
      winston.error('Process affiliate payout error:', error);
      return { success: false, error: 'Failed to process payout', details: error.message };
    }
  },
};

module.exports = paymentService;