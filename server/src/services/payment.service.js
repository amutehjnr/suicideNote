const axios = require('axios');
const mongoose = require('mongoose');
const Stripe = require('stripe');
const User = require('../models/User.model');
const Purchase = require('../models/Purchase.model');
const Ebook = require('../models/Ebook.model');
const Affiliate = require('../models/Affiliate.model');
const winston = require('winston');
const crypto = require('crypto');
const AccessCode = require('../models/AccessCode.model');
const emailService = require('./email.service');

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_BASE_URL = 'https://api.paystack.co';

// Constants
const NGN_TO_USD_RATE = process.env.NGN_USD_RATE || 500;
const EBOOK_PRICE_NGN = 2500; // ₦2,500
const EBOOK_PRICE_USD = 500; // $5.00 in cents

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
   * Initialize Payment (supports both Paystack and Stripe)
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
      
      // Determine payment method based on currency
      const paymentMethod = currency === 'USD' ? 'stripe' : 'paystack';
      
      // Create purchase record
      const purchase = new Purchase({
        user: userId,
        ebook: ebook._id,
        amount: amount, // Amount in smallest currency unit (kobo for NGN, cents for USD)
        currency: currency,
        paymentMethod: paymentMethod,
        status: 'pending',
        affiliateCode: affiliateCode || null,
        metadata: {
          ...metadata,
          originalEbookIdentifier: ebookIdentifier,
        },
      });
      
      await purchase.save();
      winston.info('✅ Purchase created:', { purchaseId: purchase._id, currency });
      
      // Initialize payment based on currency
      if (currency === 'USD') {
        return await this.initializeStripePayment(user, ebook, purchase, amount, metadata);
      } else {
        return await this.initializePaystackPayment(user, ebook, purchase, amount, metadata);
      }
      
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
   * Initialize Paystack Payment (NGN)
   */
  async initializePaystackPayment(user, ebook, purchase, amountKobo, metadata) {
    try {
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
      const callbackUrl = `${frontendUrl}/thank-you`;
      
      const payload = {
        email: metadata.guestEmail || user.email,
        amount: amountKobo, // Already in kobo
        metadata: {
          purchaseId: purchase._id.toString(),
          ebookId: ebook._id.toString(),
          ebookTitle: ebook.title,
          affiliateCode: metadata.affiliateCode || '',
          userId: user._id.toString(),
          paymentMethod: 'paystack',
          currency: 'NGN',
          ...metadata,
        },
        callback_url: callbackUrl,
      };

      winston.info('📤 Sending to Paystack:', {
        amountKobo,
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

      purchase.paystackReference = response.data.data.reference;
      purchase.transactionReference = response.data.data.reference;
      await purchase.save();

      return {
        success: true,
        data: {
          authorizationUrl: response.data.data.authorization_url,
          reference: response.data.data.reference,
          purchaseId: purchase._id,
          paymentMethod: 'paystack',
          currency: 'NGN',
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
      return { success: false, error: 'Failed to initialize Paystack payment' };
    }
  },

  /**
   * Initialize Stripe Payment (USD)
   */
  async initializeStripePayment(user, ebook, purchase, amountCents, metadata) {
    try {
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
      const successUrl = `${frontendUrl}/thank-you?session_id={CHECKOUT_SESSION_ID}`;
      const cancelUrl = `${frontendUrl}/checkout-cancelled`;
      
      // Create Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: ebook.title,
                description: ebook.shortDescription || 'Digital ebook - Suicide Note by Loba Yusuf',
                images: ebook.coverImage ? [ebook.coverImage] : [],
              },
              unit_amount: amountCents, // $5.00 = 500 cents
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: successUrl,
        cancel_url: cancelUrl,
        customer_email: metadata.guestEmail || user.email,
        client_reference_id: purchase._id.toString(),
        metadata: {
          purchaseId: purchase._id.toString(),
          ebookId: ebook._id.toString(),
          ebookTitle: ebook.title,
          userId: user._id.toString(),
          affiliateCode: metadata.affiliateCode || '',
          paymentMethod: 'stripe',
          currency: 'USD',
        },
      });

      // Update purchase with Stripe session ID
      purchase.stripeSessionId = session.id;
      purchase.stripePaymentIntentId = session.payment_intent;
      purchase.transactionReference = session.id;
      await purchase.save();

      winston.info('✅ Stripe session created:', {
        sessionId: session.id,
        purchaseId: purchase._id,
        url: session.url
      });

      return {
        success: true,
        data: {
          authorizationUrl: session.url,
          sessionId: session.id,
          purchaseId: purchase._id,
          paymentMethod: 'stripe',
          currency: 'USD',
          ebook: {
            _id: ebook._id,
            title: ebook.title,
            price: ebook.price
          }
        },
      };
    } catch (error) {
      winston.error('🔥 Stripe initialization error:', error);
      purchase.status = 'failed';
      await purchase.save();
      return { success: false, error: 'Failed to initialize Stripe payment' };
    }
  },

  /**
   * Verify Payment (supports both Paystack and Stripe)
   */
  async verifyPayment(reference) {
    try {
      winston.info('🔍 Verifying payment with reference:', reference);
      
      // Check if it's a Stripe session ID (starts with 'cs_')
      if (reference && reference.startsWith('cs_')) {
        return await this.verifyStripePayment(reference);
      } else {
        return await this.verifyPaystackPayment(reference);
      }
      
    } catch (error) {
      winston.error('🔥 Verify payment error:', error);
      return { success: false, error: 'Failed to verify payment' };
    }
  },

  /**
   * Verify Paystack Payment
   */
  async verifyPaystackPayment(reference) {
    try {
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
            purchase,
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
      };

      return await this.completeSuccessfulPayment(purchase, paymentDetails);
      
    } catch (error) {
      winston.error('🔥 Paystack verification error:', error);
      return { success: false, error: 'Failed to verify Paystack payment' };
    }
  },

  /**
   * Verify Stripe Payment
   */
  async verifyStripePayment(sessionId) {
    try {
      // Retrieve the checkout session from Stripe
      const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['payment_intent', 'line_items'],
      });

      if (session.payment_status !== 'paid') {
        return { success: false, error: 'Payment not completed' };
      }

      // Find purchase by session ID or client_reference_id
      const purchase = await Purchase.findOne({ 
        $or: [
          { stripeSessionId: sessionId },
          { transactionReference: sessionId },
          { _id: session.client_reference_id }
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
            purchase,
            paymentStatus: purchase.status,
            accessCode: existingAccessCode?.code,
            alreadyVerified: true
          },
        };
      }

      // Prepare payment details from Stripe
      const paymentIntent = session.payment_intent;
      const charge = paymentIntent?.charges?.data?.[0];
      
      const paymentDetails = {
        authorizationCode: paymentIntent?.id,
        cardType: charge?.payment_method_details?.card?.brand,
        last4: charge?.payment_method_details?.card?.last4,
        expMonth: charge?.payment_method_details?.card?.exp_month,
        expYear: charge?.payment_method_details?.card?.exp_year,
        bank: 'stripe',
        channel: 'card',
        paidAt: new Date(paymentIntent?.created * 1000),
      };

      return await this.completeSuccessfulPayment(purchase, paymentDetails);
      
    } catch (error) {
      winston.error('🔥 Stripe verification error:', error);
      return { success: false, error: 'Failed to verify Stripe payment' };
    }
  },

  /**
   * Complete successful payment (common for both Paystack and Stripe)
   */
  async completeSuccessfulPayment(purchase, paymentDetails) {
    try {
      // Create access code
      const accessCode = await AccessCode.create({
        code: `SN-${Date.now().toString(36).toUpperCase()}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`,
        user: purchase.user._id,
        ebook: purchase.ebook._id,
        purchase: purchase._id,
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        isActive: true,
      });

      // Send email
      await sendAccessCodeEmail(purchase, accessCode);

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
   * Stripe Webhook Handler
   */
  async handleStripeWebhook(req, res) {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      winston.error('⚠️ Webhook signature verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        await this.verifyStripePayment(session.id);
        winston.info(`✅ Stripe checkout completed: ${session.id}`);
        break;
        
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        winston.info(`✅ Stripe payment succeeded: ${paymentIntent.id}`);
        break;
        
      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object;
        winston.error(`❌ Stripe payment failed: ${failedPayment.id}`);
        break;
        
      default:
        winston.info(`Unhandled event type: ${event.type}`);
    }

    return res.json({ received: true });
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
        description: 'Local cards, Bank Transfer, USSD'
      },
      USD: {
        symbol: '$',
        code: 'USD',
        amount: EBOOK_PRICE_USD, // cents
        displayAmount: '5.00',
        paymentMethod: 'stripe',
        icon: '🌍',
        description: 'International cards (Visa, Mastercard, etc.)'
      }
    };
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