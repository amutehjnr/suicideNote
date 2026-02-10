const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const winston = require('winston');

const authMiddleware = {
  // Protect routes - require authentication
  protect: async (req, res, next) => {
    try {
      let token;
      
      // Check for token in Authorization header
      if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
      }
      // Check for token in cookies
      else if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
      }
      
      if (!token) {
        return res.status(401).json({
          success: false,
          error: 'Not authorized to access this route',
        });
      }
      
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Find user
      const user = await User.findById(decoded.id);
      
      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'User not found',
        });
      }
      
      // Check if user is verified
      if (!user.isVerified) {
        return res.status(403).json({
          success: false,
          error: 'Please verify your email address',
          requiresVerification: true,
        });
      }
      
      // Attach user to request
      req.user = user;
      next();
    } catch (error) {
      winston.error('Auth middleware error:', error);
      
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
          success: false,
          error: 'Invalid token',
        });
      }
      
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          error: 'Token expired',
        });
      }
      
      return res.status(500).json({
        success: false,
        error: 'Authentication failed',
      });
    }
  },

  // Optional authentication - attach user if token exists
  optional: async (req, res, next) => {
  try {
    console.log('🛂 Optional auth middleware starting...');
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
      console.log('🔑 Token found in Authorization header');
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
      console.log('🍪 Token found in cookies');
    } else {
      console.log('👤 No token found - proceeding as guest');
    }
    
    if (token) {
      console.log('🔍 Verifying token...');
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('✅ Token decoded, finding user with ID:', decoded.id);
        
        const user = await User.findById(decoded.id);
        
        if (user) {
          if (user.isVerified) {
            req.user = user;
            console.log('✅ User attached to request:', user.email);
          } else {
            console.log('⚠️ User not verified, proceeding as guest');
          }
        } else {
          console.log('⚠️ User not found in database');
        }
      } catch (verifyError) {
        console.log('⚠️ Token verification failed:', verifyError.message);
        // Continue without user
      }
    }
    
    console.log('➡️ Proceeding to next middleware');
    next();
  } catch (error) {
    console.error('🔥 Optional auth middleware error:', error);
    // Token verification failed, continue without user
    next();
  }
},

  // Restrict to specific roles
  restrictTo: (...roles) => {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: 'Not authorized',
        });
      }
      
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          error: 'You do not have permission to perform this action',
        });
      }
      
      next();
    };
  },

  // Check if user has purchased specific ebook
  hasPurchased: (ebookIdParam = 'id') => {
    return async (req, res, next) => {
      try {
        const ebookId = req.params[ebookIdParam] || req.body.ebookId;
        
        if (!ebookId) {
          return res.status(400).json({
            success: false,
            error: 'Ebook ID required',
          });
        }
        
        const hasPurchased = req.user.hasPurchased(ebookId);
        
        if (!hasPurchased) {
          return res.status(403).json({
            success: false,
            error: 'You need to purchase this ebook to access this content',
          });
        }
        
        next();
      } catch (error) {
        winston.error('Has purchased middleware error:', error);
        return res.status(500).json({
          success: false,
          error: 'Internal server error',
        });
      }
    };
  },

  // Check if user is affiliate
  isAffiliate: (req, res, next) => {
    if (!req.user || req.user.role !== 'affiliate') {
      return res.status(403).json({
        success: false,
        error: 'You need to be an affiliate to access this resource',
      });
    }
    
    next();
  },

  // Validate affiliate code in query parameters
  validateAffiliateCode: async (req, res, next) => {
    try {
      const { ref } = req.query;
      
      if (ref) {
        // Set affiliate code in cookie
        res.cookie('affiliate_ref', ref, {
          maxAge: process.env.AFFILIATE_COOKIE_EXPIRY_DAYS * 24 * 60 * 60 * 1000,
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
        });
        
        // Log affiliate click
        // This would be handled by a separate service in production
        req.affiliateCode = ref;
      }
      
      next();
    } catch (error) {
      winston.error('Validate affiliate code middleware error:', error);
      next();
    }
  },

  // Rate limiting for sensitive operations
  rateLimit: (windowMs = 15 * 60 * 1000, max = 100) => {
    const rateLimit = require('express-rate-limit');
    
    return rateLimit({
      windowMs,
      max,
      message: {
        success: false,
        error: 'Too many requests from this IP, please try again later',
      },
      standardHeaders: true,
      legacyHeaders: false,
    });
  },

  // Validate request body
  validate: (schema) => {
    return (req, res, next) => {
      const { error } = schema.validate(req.body);
      
      if (error) {
        return res.status(400).json({
          success: false,
          error: error.details[0].message,
        });
      }
      
      next();
    };
  },

  // Sanitize request data
  sanitize: (fields) => {
    return (req, res, next) => {
      if (req.body) {
        fields.forEach(field => {
          if (req.body[field]) {
            req.body[field] = req.body[field].trim();
          }
        });
      }
      
      next();
    };
  },

  // Log request details
  requestLogger: (req, res, next) => {
    const start = Date.now();
    
    res.on('finish', () => {
      const duration = Date.now() - start;
      const logData = {
        method: req.method,
        url: req.originalUrl,
        status: res.statusCode,
        duration: `${duration}ms`,
        ip: req.ip,
        userAgent: req.get('user-agent'),
        userId: req.user ? req.user._id : 'anonymous',
      };
      
      if (res.statusCode >= 400) {
        winston.warn('Request error:', logData);
      } else {
        winston.info('Request completed:', logData);
      }
    });
    
    next();
  },
};

module.exports = authMiddleware;