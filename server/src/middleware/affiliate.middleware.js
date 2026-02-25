// middleware/affiliate.middleware.js
const Affiliate = require('../models/Affiliate.model');

/**
 * Middleware to track affiliate clicks and store in cookie for 48 hours
 */
const trackAffiliate = async (req, res, next) => {
  try {
    const { ref } = req.query; // Get affiliate code from URL
    
    if (ref) {
      console.log('🔗 Affiliate link clicked:', ref);
      
      // Find the affiliate
      const affiliate = await Affiliate.findOne({ affiliateCode: ref.toUpperCase() });
      
      if (affiliate && affiliate.isActive) {
        // Get campaign info from URL
        const campaignName = req.query.campaign || null;
        const medium = req.query.medium || null;
        const source = req.query.source || null;
        
        // Track the click in affiliate record
        await affiliate.addClick(campaignName);
        
        // Store affiliate info in cookie for 48 hours (2 days)
        const cookieOptions = {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          maxAge: 48 * 60 * 60 * 1000, // 48 hours
        };
        
        // Store affiliate code
        res.cookie('affiliate_ref', ref.toUpperCase(), cookieOptions);
        
        // Store campaign info if available
        if (campaignName) {
          res.cookie('affiliate_campaign', campaignName, cookieOptions);
        }
        
        console.log(`✅ Affiliate click tracked: ${ref}, campaign: ${campaignName || 'none'}, stored for 48h`);
      } else {
        console.log('❌ Invalid or inactive affiliate code:', ref);
      }
    }
    
    next();
  } catch (error) {
    console.error('🔥 Affiliate tracking error:', error);
    next(); // Continue even if tracking fails
  }
};

/**
 * Middleware to get affiliate info from cookie
 */
const getAffiliateFromCookie = (req) => {
  const affiliateCode = req.cookies?.affiliate_ref;
  const campaignName = req.cookies?.affiliate_campaign;
  
  if (affiliateCode) {
    return {
      affiliateCode,
      campaignName,
      expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000),
    };
  }
  
  return null;
};

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path[0],
        message: detail.message
      }));
      
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        errors
      });
    }
    
    next();
  };
};

module.exports = {
  trackAffiliate,
  getAffiliateFromCookie,
  validate,
};