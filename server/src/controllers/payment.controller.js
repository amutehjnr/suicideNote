const paymentService = require('../services/payment.service');
const Affiliate = require('../models/Affiliate.model');
const User = require('../models/User.model');
const winston = require('winston');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// Setup Winston logger with console transport
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'payment-service' },
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
  ],
});

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
};

const paymentController = {
  /**
   * INITIALIZE PAYMENT
   * Handles guest + authenticated users
   */
  async initializePayment(req, res) {
    try {
      const { ebookId, affiliateCode, campaignName, email, name, amount } = req.body;

      // --- Validation ---
      if (!ebookId) return res.status(400).json({ success: false, error: 'Ebook ID is required' });
      if (!email) return res.status(400).json({ success: false, error: 'Email is required' });
      if (!amount || Number(amount) <= 0) return res.status(400).json({ success: false, error: 'Amount is required and must be greater than 0' });

      let user = req.user;
      let isNewUser = false;

      // --- Auto-create guest user ---
      if (!user) {
        user = await User.findOne({ email: email.toLowerCase().trim() });
        if (!user) {
          user = new User({
            email: email.toLowerCase().trim(),
            name: name || email.split('@')[0],
            password: crypto.randomBytes(24).toString('hex'),
            isVerified: true,
            role: 'user',
          });
          await user.save();
          isNewUser = true;
          logger.info(`Created new guest user: ${user.email}`);
        }
      }

      const affiliateCodeToUse = affiliateCode || req.cookies?.affiliate_ref || null;

      const metadata = {
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'] || 'unknown',
        deviceType: req.headers['sec-ch-ua-platform'] || 'unknown',
        campaignName: campaignName || null,
        guestEmail: email,
        guestName: name || email.split('@')[0],
        autoCreated: isNewUser,
      };

      logger.info('Initializing payment for user:', { userId: user._id, ebookId, amount });

      // --- Call payment service ---
      const result = await paymentService.initializePayment(
        user._id,
        ebookId,
        affiliateCodeToUse,
        metadata,
        Math.floor(Number(amount) * 100) // convert Naira to Kobo
      );

      if (!result.success) {
        logger.warn('Payment initialization failed:', result.error);
        return res.status(400).json(result);
      }

      let token;
      if (!req.user) {
        token = typeof user.generateAuthToken === 'function'
          ? user.generateAuthToken()
          : jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.cookie('token', token, COOKIE_OPTIONS);
      }

      return res.status(200).json({
        success: true,
        message: isNewUser ? 'Account created and payment initialized' : 'Payment initialized',
        data: {
          ...result.data,
          user: { _id: user._id, email: user.email, name: user.name, isNewUser },
          token,
        },
      });
    } catch (error) {
      logger.error('Initialize payment error:', error);
      return res.status(500).json({ success: false, error: 'Failed to initialize payment', details: error.message });
    }
  },

  /**
   * VERIFY PAYMENT
   */
  async verifyPayment(req, res) {
    try {
      const { reference } = req.body;
      if (!reference) return res.status(400).json({ success: false, error: 'Payment reference is required' });

      const result = await paymentService.verifyPayment(reference);
      if (!result.success) {
        logger.warn('Payment verification failed:', result.error);
        return res.status(400).json(result);
      }

      // Issue token if user exists
      const userId = result.data?.purchase?.user?._id;
      if (userId) {
        const user = await User.findById(userId);
        if (user) {
          const token = typeof user.generateAuthToken === 'function'
            ? user.generateAuthToken()
            : jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '30d' });

          res.cookie('token', token, COOKIE_OPTIONS);

          result.data.token = token;
          result.data.user = { _id: user._id, email: user.email, name: user.name };
        }
      }

      return res.status(200).json(result);
    } catch (error) {
      logger.error('Verify payment error:', error);
      return res.status(500).json({ success: false, error: 'Failed to verify payment', details: error.message });
    }
  },

  /**
 * PAYSTACK WEBHOOK
 */
async handlePaystackWebhook(req, res) {
  try {
    const hash = crypto
      .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
      .update(req.rawBody || JSON.stringify(req.body))
      .digest('hex');

    if (hash !== req.headers['x-paystack-signature']) {
      logger.warn('Invalid Paystack webhook signature');
      return res.status(401).send('Invalid signature');
    }

    const event = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    switch (event.event) {
      case 'charge.success':
        // This will now trigger the email sending in verifyPayment
        await paymentService.verifyPayment(event.data.reference);
        logger.info(`Charge success for ${event.data.reference}`);
        break;
      case 'transfer.success':
        logger.info(`Transfer success: ${event.data.reference}`);
        break;
      case 'transfer.failed':
        logger.error(`Transfer failed: ${event.data.reference} - ${event.data.reason}`);
        break;
      case 'transfer.reversed':
        logger.warn(`Transfer reversed: ${event.data.reference}`);
        break;
    }

    return res.status(200).send('Webhook processed');
  } catch (error) {
    logger.error('Webhook error:', error);
    return res.status(500).send('Webhook failed');
  }
},

  /**
   * GET USER PURCHASES
   */
  async getUserPurchases(req, res) {
    try {
      const result = await paymentService.getUserPurchases(req.user._id);
      if (!result.success) return res.status(400).json(result);
      return res.status(200).json(result);
    } catch (error) {
      logger.error('Get purchases error:', error);
      return res.status(500).json({ success: false, error: 'Failed to fetch purchases', details: error.message });
    }
  },

  async getPurchaseById(req, res) {
    try {
      const result = await paymentService.getPurchaseById(req.params.id, req.user._id);
      if (!result.success) return res.status(result.error === 'Purchase not found' ? 404 : 400).json(result);
      return res.status(200).json(result);
    } catch (error) {
      logger.error('Get purchase by ID error:', error);
      return res.status(500).json({ success: false, error: 'Failed to fetch purchase', details: error.message });
    }
  },

  async validateAccessCode(req, res) {
  try {
    const { code, ebookId, ebookSlug } = req.body;
    
    console.log('🔑 [VALIDATE] Request data:', req.body);
    console.log('🔑 Received:', { 
      code: code?.substring(0, 10) + '...', 
      ebookId, 
      ebookSlug 
    });
    
    // ⚠️ FIXED: Check for EITHER ebookId OR ebookSlug
    if (!code) {
      return res.status(400).json({ 
        success: false, 
        error: 'Access code is required' 
      });
    }
    
    // ⚠️ FIXED: We don't require ebookId anymore
    // if (!ebookId && !ebookSlug) {
    //   return res.status(400).json({ 
    //     success: false, 
    //     error: 'Either ebook ID or ebook slug is required' 
    //   });
    // }
    
    // Clean the code
    const cleanCode = code.trim().toUpperCase();
    console.log('🔑 Cleaned code:', cleanCode);
    
    // Load necessary models
    const AccessCode = require('../models/AccessCode.model');
    const Ebook = require('../models/Ebook.model');
    
    // Step 1: Find the ebook
    let ebook;
    
    if (ebookId) {
      console.log('🔍 Looking for ebook by ID:', ebookId);
      ebook = await Ebook.findById(ebookId);
    } else if (ebookSlug) {
      console.log('🔍 Looking for ebook by slug:', ebookSlug);
      ebook = await Ebook.findOne({ slug: ebookSlug });
    } else {
      // Default to suicide-note-2026 if nothing provided
      console.log('🔍 Using default ebook: suicide-note-2026');
      ebook = await Ebook.findOne({ slug: 'suicide-note-2026' });
    }
    
    if (!ebook) {
      console.log('❌ Ebook not found');
      return res.status(404).json({ 
        success: false, 
        error: 'Ebook not found' 
      });
    }
    
    console.log('✅ Found ebook:', { 
      id: ebook._id, 
      title: ebook.title, 
      slug: ebook.slug 
    });
    
    // Step 2: Find the access code for this specific ebook
    console.log('🔍 Looking for access code:', cleanCode, 'for ebook:', ebook._id);
    
    const accessCode = await AccessCode.findOne({
      code: cleanCode,
      ebook: ebook._id,
      isActive: true
    });
    
    if (!accessCode) {
      console.log('❌ Access code not found for this ebook');
      
      // Check if the code exists for ANY ebook
      const anyAccessCode = await AccessCode.findOne({
        code: cleanCode,
        isActive: true
      }).populate('ebook');
      
      if (anyAccessCode) {
        console.log('⚠️ Code exists but for different ebook:', {
          code: anyAccessCode.code,
          ebookId: anyAccessCode.ebook?._id,
          ebookTitle: anyAccessCode.ebook?.title,
          ebookSlug: anyAccessCode.ebook?.slug
        });
        
        return res.status(400).json({ 
          success: false, 
          error: 'This access code is for a different ebook',
          details: anyAccessCode.ebook ? 
            `This code is for: "${anyAccessCode.ebook.title}"` : 
            'Unknown ebook'
        });
      }
      
      return res.status(404).json({ 
        success: false, 
        error: 'Invalid access code' 
      });
    }
    
    // Step 3: Check if code is expired
    const now = new Date();
    if (now > accessCode.expiresAt) {
      console.log('❌ Access code expired:', accessCode.expiresAt);
      return res.status(400).json({ 
        success: false, 
        error: 'Access code has expired' 
      });
    }
    
    // Step 4: Increment access count
    accessCode.accessCount += 1;
    accessCode.lastAccessedAt = now;
    await accessCode.save();
    
    console.log('✅ Access code is valid:', {
      code: cleanCode,
      ebook: ebook.title,
      accessCount: accessCode.accessCount,
      expiresAt: accessCode.expiresAt
    });
    
    return res.json({
      success: true,
      data: {
        isValid: true,
        accessCode: cleanCode,
        ebook: {
          _id: ebook._id,
          title: ebook.title,
          slug: ebook.slug,
          coverImage: ebook.coverImage
        },
        accessCount: accessCode.accessCount,
        lastAccessedAt: accessCode.lastAccessedAt,
        expiresAt: accessCode.expiresAt,
        createdAt: accessCode.createdAt,
        validatedAt: now.toISOString()
      }
    });
    
  } catch (error) {
    console.error('🔥 [BACKEND ERROR] Validate access code:', error);
    console.error('Error stack:', error.stack);
    
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to validate access code',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
},

  async requestRefund(req, res) {
    try {
      const result = await paymentService.requestRefund(req.body.purchaseId, req.user._id, req.body.reason);
      if (!result.success) return res.status(400).json(result);
      return res.status(200).json(result);
    } catch (error) {
      logger.error('Request refund error:', error);
      return res.status(500).json({ success: false, error: 'Failed to request refund', details: error.message });
    }
  },

  async getAffiliateEarnings(req, res) {
    try {
      const affiliate = await Affiliate.findOne({ user: req.user._id });
      if (!affiliate) return res.status(404).json({ success: false, error: 'Affiliate not found' });
      return res.status(200).json({ success: true, data: affiliate });
    } catch (error) {
      logger.error('Affiliate earnings error:', error);
      return res.status(500).json({ success: false, error: 'Failed to fetch affiliate earnings', details: error.message });
    }
  },

  async requestPayout(req, res) {
    try {
      const affiliate = await Affiliate.findOne({ user: req.user._id });
      if (!affiliate) return res.status(404).json({ success: false, error: 'Affiliate not found' });

      const result = await paymentService.processAffiliatePayout(affiliate._id, req.body.amount);
      if (!result.success) return res.status(400).json(result);

      return res.status(200).json(result);
    } catch (error) {
      logger.error('Affiliate payout error:', error);
      return res.status(500).json({ success: false, error: 'Failed to process payout', details: error.message });
    }
  },

  async updateBankDetails(req, res) {
    try {
      const { accountNumber, accountName, bankCode, bankName } = req.body;
      const affiliate = await Affiliate.findOne({ user: req.user._id });
      if (!affiliate) return res.status(404).json({ success: false, error: 'Affiliate not found' });

      affiliate.bankDetails = { accountNumber, accountName, bankCode, bankName };
      await affiliate.save();

      return res.status(200).json({ success: true, message: 'Bank details updated', data: affiliate.bankDetails });
    } catch (error) {
      logger.error('Update bank details error:', error);
      return res.status(500).json({ success: false, error: 'Failed to update bank details', details: error.message });
    }
  },

  async trackAffiliateClick(req, res) {
    try {
      const { affiliateCode, campaignName } = req.query;
      if (!affiliateCode) return res.status(400).json({ success: false, error: 'Affiliate code is required' });

      const affiliate = await Affiliate.findOne({ affiliateCode });
      if (!affiliate) return res.status(404).json({ success: false, error: 'Affiliate not found' });

      await affiliate.addClick(campaignName);
      res.cookie('affiliate_ref', affiliateCode, COOKIE_OPTIONS);

      return res.status(200).json({ success: true, message: 'Click tracked' });
    } catch (error) {
      logger.error('Track click error:', error);
      return res.status(500).json({ success: false, error: 'Failed to track click', details: error.message });
    }
  },
};

module.exports = paymentController;
