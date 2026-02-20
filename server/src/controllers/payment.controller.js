const paymentService = require('../services/payment.service');
const Affiliate = require('../models/Affiliate.model');
const User = require('../models/User.model');
const winston = require('winston');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// Setup Winston logger
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
   * INITIALIZE PAYMENT - Supports both NGN and USD via Paystack
   */
  async initializePayment(req, res) {
    try {
      const { ebookId, affiliateCode, campaignName, email, name, amount, currency = 'NGN' } = req.body;

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
        campaignName: campaignName || 'direct-purchase',
        guestEmail: email,
        guestName: name || email.split('@')[0],
        autoCreated: isNewUser,
      };

      logger.info('Initializing payment:', { 
        userId: user._id, 
        ebookId, 
        amount, 
        currency 
      });

      // Call payment service with currency
      const result = await paymentService.initializePayment(
        user._id,
        ebookId,
        affiliateCodeToUse,
        metadata,
        Math.floor(Number(amount)),
        currency
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
   * GET CURRENCY OPTIONS
   */
  async getCurrencyOptions(req, res) {
    try {
      const options = paymentService.getCurrencyOptions();
      return res.status(200).json({
        success: true,
        data: options
      });
    } catch (error) {
      logger.error('Get currency options error:', error);
      return res.status(500).json({ success: false, error: 'Failed to get currency options' });
    }
  },

  /**
   * VALIDATE ACCESS CODE
   */
  async validateAccessCode(req, res) {
    try {
      const { code, ebookId, ebookSlug } = req.body;
      
      if (!code) {
        return res.status(400).json({ 
          success: false, 
          error: 'Access code is required' 
        });
      }
      
      const cleanCode = code.trim().toUpperCase();
      
      const AccessCode = require('../models/AccessCode.model');
      const Ebook = require('../models/Ebook.model');
      
      let ebook;
      
      if (ebookId) {
        ebook = await Ebook.findById(ebookId);
      } else if (ebookSlug) {
        ebook = await Ebook.findOne({ slug: ebookSlug });
      } else {
        ebook = await Ebook.findOne({ slug: 'suicide-note-2026' });
      }
      
      if (!ebook) {
        return res.status(404).json({ 
          success: false, 
          error: 'Ebook not found' 
        });
      }
      
      const accessCode = await AccessCode.findOne({
        code: cleanCode,
        ebook: ebook._id,
        isActive: true
      });
      
      if (!accessCode) {
        return res.status(404).json({ 
          success: false, 
          error: 'Invalid access code' 
        });
      }
      
      const now = new Date();
      if (now > accessCode.expiresAt) {
        return res.status(400).json({ 
          success: false, 
          error: 'Access code has expired' 
        });
      }
      
      accessCode.accessCount += 1;
      accessCode.lastAccessedAt = now;
      await accessCode.save();
      
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
      logger.error('Validate access code error:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to validate access code' 
      });
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

  /**
   * GET PURCHASE BY ID
   */
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

  /**
   * TRACK AFFILIATE CLICK
   */
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