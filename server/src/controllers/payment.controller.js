// const paymentService = require('../services/payment.service');
// const Affiliate = require('../models/Affiliate.model');
// const User = require('../models/User.model');
// const winston = require('winston');
// const crypto = require('crypto');
// const jwt = require('jsonwebtoken');

// // Setup Winston logger
// const logger = winston.createLogger({
//   level: 'info',
//   format: winston.format.json(),
//   defaultMeta: { service: 'payment-service' },
//   transports: [
//     new winston.transports.Console({ format: winston.format.simple() }),
//   ],
// });

// const COOKIE_OPTIONS = {
//   httpOnly: true,
//   secure: process.env.NODE_ENV === 'production',
//   sameSite: 'lax',
//   path: '/',
//   maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
// };

// const paymentController = {
//   /**
//    * INITIALIZE PAYMENT - Supports both NGN and USD via Paystack
//    * FIXED: Always use email from request body, not logged-in user
//    */
//   async initializePayment(req, res) {
//     try {
//       const { ebookId, affiliateCode, campaignName: bodyCampaignName, email, name, amount, currency = 'NGN' } = req.body;

//       // --- Validation ---
//       if (!ebookId) return res.status(400).json({ success: false, error: 'Ebook ID is required' });
//       if (!email) return res.status(400).json({ success: false, error: 'Email is required' });
//       if (!amount || Number(amount) <= 0) return res.status(400).json({ success: false, error: 'Amount is required and must be greater than 0' });

//       // --- CRITICAL FIX: ALWAYS use the email from the request body ---
//       // This ensures we're using the purchaser's email, not the logged-in user's email
//       const purchaserEmail = email.toLowerCase().trim();
      
//       console.log('🎯 Processing payment for:', {
//         purchaserEmail,
//         loggedInUser: req.user ? req.user.email : 'No logged in user',
//         affiliateCode: affiliateCode || req.cookies?.affiliate_ref || null
//       });

//       // --- ALWAYS find or create user based on purchaser email, NOT req.user ---
//       let user = await User.findOne({ email: purchaserEmail });
//       let isNewUser = false;

//       if (!user) {
//         user = new User({
//           email: purchaserEmail,
//           name: name || purchaserEmail.split('@')[0],
//           password: crypto.randomBytes(24).toString('hex'),
//           isVerified: true,
//           role: 'user',
//         });
//         await user.save();
//         isNewUser = true;
//         logger.info(`Created new user for purchaser: ${user.email}`);
//       } else {
//         logger.info(`Found existing user for purchaser: ${user.email}`);
//       }

//       // Get affiliate code from multiple sources
//       const affiliateCodeToUse = affiliateCode || req.cookies?.affiliate_ref || null;
      
//       // Use cookie campaign if exists, otherwise use body campaign
//       const finalCampaignName = req.cookies?.affiliate_campaign || bodyCampaignName || 'direct-purchase';
      
//       const metadata = {
//         ipAddress: req.ip,
//         userAgent: req.headers['user-agent'] || 'unknown',
//         deviceType: req.headers['sec-ch-ua-platform'] || 'unknown',
//         campaignName: finalCampaignName,
//         guestEmail: purchaserEmail, // Use purchaser email
//         guestName: name || purchaserEmail.split('@')[0],
//         autoCreated: isNewUser,
//         // Store the original logged-in user for reference if needed
//         loggedInUser: req.user ? req.user.email : null,
//       };

//       logger.info('Initializing payment:', { 
//         userId: user._id, 
//         userEmail: user.email,
//         ebookId, 
//         amount, 
//         currency,
//         hasAffiliate: !!affiliateCodeToUse
//       });

//       // Call payment service with currency
//       const result = await paymentService.initializePayment(
//         user._id, // Use the purchaser's user ID
//         ebookId,
//         affiliateCodeToUse,
//         metadata,
//         Math.floor(Number(amount)),
//         currency
//       );

//       if (!result.success) {
//         logger.warn('Payment initialization failed:', result.error);
//         return res.status(400).json(result);
//       }

//       // Only set token if this is a new user (not logged in)
//       let token;
//       if (!req.user) {
//         token = typeof user.generateAuthToken === 'function'
//           ? user.generateAuthToken()
//           : jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '30d' });

//         res.cookie('token', token, COOKIE_OPTIONS);
//       }

//       return res.status(200).json({
//         success: true,
//         message: isNewUser ? 'Account created and payment initialized' : 'Payment initialized',
//         data: {
//           ...result.data,
//           user: { _id: user._id, email: user.email, name: user.name, isNewUser },
//           token,
//         },
//       });
//     } catch (error) {
//       logger.error('Initialize payment error:', error);
//       return res.status(500).json({ success: false, error: 'Failed to initialize payment', details: error.message });
//     }
//   },

//   /**
//    * VERIFY PAYMENT
//    */
//   async verifyPayment(req, res) {
//     try {
//       const { reference } = req.body;
//       if (!reference) return res.status(400).json({ success: false, error: 'Payment reference is required' });

//       const result = await paymentService.verifyPayment(reference);
//       if (!result.success) {
//         logger.warn('Payment verification failed:', result.error);
//         return res.status(400).json(result);
//       }

//       // Issue token if user exists
//       const userId = result.data?.purchase?.user?._id;
//       if (userId) {
//         const user = await User.findById(userId);
//         if (user) {
//           const token = typeof user.generateAuthToken === 'function'
//             ? user.generateAuthToken()
//             : jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '30d' });

//           res.cookie('token', token, COOKIE_OPTIONS);

//           result.data.token = token;
//           result.data.user = { _id: user._id, email: user.email, name: user.name };
//         }
//       }

//       return res.status(200).json(result);
//     } catch (error) {
//       logger.error('Verify payment error:', error);
//       return res.status(500).json({ success: false, error: 'Failed to verify payment', details: error.message });
//     }
//   },

//   /**
//    * PAYSTACK WEBHOOK
//    */
//   async handlePaystackWebhook(req, res) {
//     try {
//       const hash = crypto
//         .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
//         .update(req.rawBody || JSON.stringify(req.body))
//         .digest('hex');

//       if (hash !== req.headers['x-paystack-signature']) {
//         logger.warn('Invalid Paystack webhook signature');
//         return res.status(401).send('Invalid signature');
//       }

//       const event = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

//       switch (event.event) {
//         case 'charge.success':
//           await paymentService.verifyPayment(event.data.reference);
//           logger.info(`Charge success for ${event.data.reference}`);
//           break;
//         case 'transfer.success':
//           logger.info(`Transfer success: ${event.data.reference}`);
//           break;
//         case 'transfer.failed':
//           logger.error(`Transfer failed: ${event.data.reference} - ${event.data.reason}`);
//           break;
//         case 'transfer.reversed':
//           logger.warn(`Transfer reversed: ${event.data.reference}`);
//           break;
//       }

//       return res.status(200).send('Webhook processed');
//     } catch (error) {
//       logger.error('Webhook error:', error);
//       return res.status(500).send('Webhook failed');
//     }
//   },

//   /**
//    * GET CURRENCY OPTIONS
//    */
//   async getCurrencyOptions(req, res) {
//     try {
//       const options = paymentService.getCurrencyOptions();
//       return res.status(200).json({
//         success: true,
//         data: options
//       });
//     } catch (error) {
//       logger.error('Get currency options error:', error);
//       return res.status(500).json({ success: false, error: 'Failed to get currency options' });
//     }
//   },

//   /**
//    * VALIDATE ACCESS CODE
//    */
//   async validateAccessCode(req, res) {
//     try {
//       const { code, ebookId, ebookSlug } = req.body;
      
//       if (!code) {
//         return res.status(400).json({ 
//           success: false, 
//           error: 'Access code is required' 
//         });
//       }
      
//       const cleanCode = code.trim().toUpperCase();
      
//       const AccessCode = require('../models/AccessCode.model');
//       const Ebook = require('../models/Ebook.model');
      
//       let ebook;
      
//       if (ebookId) {
//         ebook = await Ebook.findById(ebookId);
//       } else if (ebookSlug) {
//         ebook = await Ebook.findOne({ slug: ebookSlug });
//       } else {
//         ebook = await Ebook.findOne({ slug: 'suicide-note-2026' });
//       }
      
//       if (!ebook) {
//         return res.status(404).json({ 
//           success: false, 
//           error: 'Ebook not found' 
//         });
//       }
      
//       const accessCode = await AccessCode.findOne({
//         code: cleanCode,
//         ebook: ebook._id,
//         isActive: true
//       });
      
//       if (!accessCode) {
//         return res.status(404).json({ 
//           success: false, 
//           error: 'Invalid access code' 
//         });
//       }
      
//       const now = new Date();
//       if (now > accessCode.expiresAt) {
//         return res.status(400).json({ 
//           success: false, 
//           error: 'Access code has expired' 
//         });
//       }
      
//       accessCode.accessCount += 1;
//       accessCode.lastAccessedAt = now;
//       await accessCode.save();
      
//       return res.json({
//         success: true,
//         data: {
//           isValid: true,
//           accessCode: cleanCode,
//           ebook: {
//             _id: ebook._id,
//             title: ebook.title,
//             slug: ebook.slug,
//             coverImage: ebook.coverImage
//           },
//           accessCount: accessCode.accessCount,
//           lastAccessedAt: accessCode.lastAccessedAt,
//           expiresAt: accessCode.expiresAt,
//           createdAt: accessCode.createdAt,
//           validatedAt: now.toISOString()
//         }
//       });
      
//     } catch (error) {
//       logger.error('Validate access code error:', error);
//       return res.status(500).json({ 
//         success: false, 
//         error: 'Failed to validate access code' 
//       });
//     }
//   },

//   /**
//    * GET USER PURCHASES
//    */
//   async getUserPurchases(req, res) {
//     try {
//       const result = await paymentService.getUserPurchases(req.user._id);
//       if (!result.success) return res.status(400).json(result);
//       return res.status(200).json(result);
//     } catch (error) {
//       logger.error('Get purchases error:', error);
//       return res.status(500).json({ success: false, error: 'Failed to fetch purchases', details: error.message });
//     }
//   },

//   /**
//    * GET PURCHASE BY ID
//    */
//   async getPurchaseById(req, res) {
//     try {
//       const result = await paymentService.getPurchaseById(req.params.id, req.user._id);
//       if (!result.success) return res.status(result.error === 'Purchase not found' ? 404 : 400).json(result);
//       return res.status(200).json(result);
//     } catch (error) {
//       logger.error('Get purchase by ID error:', error);
//       return res.status(500).json({ success: false, error: 'Failed to fetch purchase', details: error.message });
//     }
//   },

//   /**
//    * TRACK AFFILIATE CLICK
//    */
//   async trackAffiliateClick(req, res) {
//     try {
//       const { affiliateCode, campaignName } = req.query;
//       if (!affiliateCode) return res.status(400).json({ success: false, error: 'Affiliate code is required' });

//       const affiliate = await Affiliate.findOne({ affiliateCode });
//       if (!affiliate) return res.status(404).json({ success: false, error: 'Affiliate not found' });

//       await affiliate.addClick(campaignName);
//       res.cookie('affiliate_ref', affiliateCode, COOKIE_OPTIONS);
      
//       if (campaignName) {
//         res.cookie('affiliate_campaign', campaignName, COOKIE_OPTIONS);
//       }

//       return res.status(200).json({ success: true, message: 'Click tracked' });
//     } catch (error) {
//       logger.error('Track click error:', error);
//       return res.status(500).json({ success: false, error: 'Failed to track click', details: error.message });
//     }
//   },

//   /**
//    * DEBUG - Check purchase affiliate data
//    */
//   async debugPurchase(req, res) {
//     try {
//       const { purchaseId } = req.params;
      
//       const Purchase = require('../models/Purchase.model');
//       const Affiliate = require('../models/Affiliate.model');
      
//       const purchase = await Purchase.findById(purchaseId)
//         .populate('user', 'email name')
//         .populate('ebook', 'title')
//         .lean();
      
//       if (!purchase) {
//         return res.status(404).json({ success: false, error: 'Purchase not found' });
//       }
      
//       // Find the affiliate if any
//       let affiliate = null;
//       if (purchase.affiliateCode) {
//         affiliate = await Affiliate.findOne({ 
//           affiliateCode: purchase.affiliateCode 
//         }).populate('user', 'email name').lean();
//       }
      
//       return res.json({
//         success: true,
//         data: {
//           purchase: {
//             id: purchase._id,
//             amount: purchase.amount,
//             status: purchase.status,
//             affiliateCode: purchase.affiliateCode,
//             metadata: purchase.metadata,
//             createdAt: purchase.createdAt
//           },
//           affiliate: affiliate ? {
//             code: affiliate.affiliateCode,
//             email: affiliate.user?.email,
//             name: affiliate.user?.name,
//             totalEarnings: affiliate.totalEarnings,
//             pendingEarnings: affiliate.pendingEarnings
//           } : null
//         }
//       });
//     } catch (error) {
//       console.error('Debug error:', error);
//       res.status(500).json({ success: false, error: error.message });
//     }
//   }
// };

// module.exports = paymentController;


const Affiliate = require('../models/Affiliate.model');
const User = require('../models/User.model');
const Purchase = require('../models/Purchase.model');
const Ebook = require('../models/Ebook.model');
const AccessCode = require('../models/AccessCode.model');
const emailService = require('../services/email.service');
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

// Selar product URL
const SELAR_PRODUCT_URL = 'https://selar.com/5r5j7s1kb3';

const paymentController = {
  /**
   * GET SELAR CHECKOUT URL
   */
  getSelarCheckoutUrl(req, res) {
    try {
      const { email, name, affiliateCode } = req.query;
      
      // Build redirect URL with parameters
      const redirectUrl = `${process.env.FRONTEND_URL || 'https://suicidenotebook.com'}/thank-you`;
      
      // Selar checkout URL with redirect
      let checkoutUrl = `${SELAR_PRODUCT_URL}?redirect_url=${encodeURIComponent(redirectUrl)}`;
      
      // Add affiliate tracking if present
      if (affiliateCode) {
        checkoutUrl += `&ref=${affiliateCode}`;
      }
      
      // Store pending purchase info in session or cookie
      if (email) {
        // Store for later verification
        res.cookie('pending_purchase', JSON.stringify({ 
          email, 
          name, 
          affiliateCode,
          timestamp: Date.now() 
        }), { 
          ...COOKIE_OPTIONS, 
          maxAge: 30 * 60 * 1000 // 30 minutes
        });
      }
      
      return res.json({
        success: true,
        data: {
          checkoutUrl,
          productUrl: SELAR_PRODUCT_URL
        }
      });
    } catch (error) {
      logger.error('Get Selar checkout URL error:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to get checkout URL' 
      });
    }
  },

  /**
   * VERIFY SELAR PAYMENT
   * Called from thank-you page after Selar redirect
   */
  async verifySelarPayment(req, res) {
    try {
      const { transaction_id, email, name, amount, product_id } = req.body;
      
      if (!transaction_id) {
        return res.status(400).json({ success: false, error: 'Transaction ID is required' });
      }

      console.log('🔍 Verifying Selar payment:', { transaction_id, email });

      // Check if purchase already exists
      const existingPurchase = await Purchase.findOne({ 
        transactionReference: transaction_id 
      });

      if (existingPurchase && existingPurchase.status === 'completed') {
        const accessCode = await AccessCode.findOne({ purchase: existingPurchase._id });
        return res.json({
          success: true,
          accessCode: accessCode?.code,
          purchase: existingPurchase,
          alreadyVerified: true
        });
      }

      // Find or create user
      let user = await User.findOne({ email: email?.toLowerCase().trim() });
      let isNewUser = false;

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
        logger.info(`Created new user for Selar purchaser: ${user.email}`);
      }

      // Find ebook
      const ebook = await Ebook.findOne({ 
        $or: [
          { slug: 'suicide-note-2026' },
          { customId: 'suicide-note-2026' }
        ]
      });

      if (!ebook) {
        return res.status(404).json({ success: false, error: 'Ebook not found' });
      }

      // Generate access code
      const accessCode = await AccessCode.create({
        code: `SN-${Date.now().toString(36).toUpperCase()}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`,
        user: user._id,
        ebook: ebook._id,
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
        isActive: true,
      });

      // Create purchase record
      const purchase = new Purchase({
        user: user._id,
        ebook: ebook._id,
        amount: amount || 3000,
        currency: 'NGN',
        paymentMethod: 'selar',
        status: 'completed',
        transactionReference: transaction_id,
        metadata: {
          guestEmail: email,
          guestName: name || email.split('@')[0],
          autoCreated: isNewUser,
          paymentMethod: 'selar',
          ipAddress: req.ip,
          userAgent: req.headers['user-agent'] || 'unknown',
        },
        accessCode: accessCode._id,
        paymentDetails: {
          paidAt: new Date(),
          channel: 'selar',
          transactionId: transaction_id,
        },
        completedAt: new Date(),
      });

      await purchase.save();

      // Update user's purchased ebooks
      if (!user.purchasedEbooks) user.purchasedEbooks = [];
      if (!user.purchasedEbooks.includes(ebook._id)) {
        user.purchasedEbooks.push(ebook._id);
        await user.save();
      }

      // Send email with access code
      try {
        await emailService.sendAccessCodeEmail(
          user.email,
          user.name || 'Valued Reader',
          accessCode.code,
          ebook
        );
        logger.info(`Access code email sent to: ${user.email}`);
      } catch (emailError) {
        logger.error('Email sending failed:', emailError);
      }

      // Generate auth token for the user
      const token = typeof user.generateAuthToken === 'function'
        ? user.generateAuthToken()
        : jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '30d' });

      // Set cookie
      res.cookie('token', token, COOKIE_OPTIONS);

      logger.info('✅ Selar payment verified and saved:', { 
        transaction_id, 
        purchaseId: purchase._id,
        accessCode: accessCode.code 
      });

      return res.json({
        success: true,
        accessCode: accessCode.code,
        purchase: {
          _id: purchase._id,
          amount: purchase.amount,
          currency: purchase.currency,
          status: purchase.status,
          createdAt: purchase.createdAt,
          ebook: {
            _id: ebook._id,
            title: ebook.title,
            slug: ebook.slug
          }
        },
        user: { _id: user._id, email: user.email, name: user.name },
        token,
        isNewUser
      });

    } catch (error) {
      logger.error('Selar verification error:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to verify Selar payment',
        details: error.message 
      });
    }
  },

  /**
   * HANDLE SELAR REDIRECT
   * Alternative: Parse query params from redirect
   */
  async handleSelarRedirect(req, res) {
    try {
      const { reference, transaction_id, email, name } = req.query;
      const transactionId = reference || transaction_id;
      
      if (!transactionId) {
        return res.redirect('/thank-you?error=no_transaction');
      }

      // Redirect to thank-you with transaction data
      const redirectUrl = `${process.env.FRONTEND_URL || 'https://suicidenotebook.com'}/thank-you?transaction_id=${transactionId}&email=${email || ''}&name=${name || ''}`;
      
      return res.redirect(redirectUrl);
      
    } catch (error) {
      logger.error('Selar redirect error:', error);
      return res.redirect('/thank-you?error=verification_failed');
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
      const purchases = await Purchase.find({ user: req.user._id })
        .populate('ebook')
        .populate('accessCode')
        .sort({ createdAt: -1 });
      
      return res.json({ success: true, data: purchases });
    } catch (error) {
      logger.error('Get purchases error:', error);
      return res.status(500).json({ success: false, error: 'Failed to fetch purchases' });
    }
  },

  /**
   * GET PURCHASE BY ID
   */
  async getPurchaseById(req, res) {
    try {
      const purchase = await Purchase.findOne({ 
        _id: req.params.id, 
        user: req.user._id 
      })
        .populate('ebook')
        .populate('accessCode');
      
      if (!purchase) {
        return res.status(404).json({ success: false, error: 'Purchase not found' });
      }
      
      return res.json({ success: true, data: purchase });
    } catch (error) {
      logger.error('Get purchase by ID error:', error);
      return res.status(500).json({ success: false, error: 'Failed to fetch purchase' });
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
      
      if (campaignName) {
        res.cookie('affiliate_campaign', campaignName, COOKIE_OPTIONS);
      }

      return res.status(200).json({ success: true, message: 'Click tracked' });
    } catch (error) {
      logger.error('Track click error:', error);
      return res.status(500).json({ success: false, error: 'Failed to track click' });
    }
  },

  /**
   * DEBUG - Check purchase affiliate data
   */
  async debugPurchase(req, res) {
    try {
      const { purchaseId } = req.params;
      
      const purchase = await Purchase.findById(purchaseId)
        .populate('user', 'email name')
        .populate('ebook', 'title')
        .lean();
      
      if (!purchase) {
        return res.status(404).json({ success: false, error: 'Purchase not found' });
      }
      
      let affiliate = null;
      if (purchase.affiliateCode) {
        affiliate = await Affiliate.findOne({ 
          affiliateCode: purchase.affiliateCode 
        }).populate('user', 'email name').lean();
      }
      
      return res.json({
        success: true,
        data: {
          purchase: {
            id: purchase._id,
            amount: purchase.amount,
            status: purchase.status,
            affiliateCode: purchase.affiliateCode,
            metadata: purchase.metadata,
            createdAt: purchase.createdAt
          },
          affiliate: affiliate ? {
            code: affiliate.affiliateCode,
            email: affiliate.user?.email,
            name: affiliate.user?.name,
            totalEarnings: affiliate.totalEarnings,
            pendingEarnings: affiliate.pendingEarnings
          } : null
        }
      });
    } catch (error) {
      console.error('Debug error:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
};

module.exports = paymentController;