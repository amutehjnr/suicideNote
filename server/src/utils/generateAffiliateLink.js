const crypto = require('crypto');
const Affiliate = require('../models/Affiliate.model');

/**
 * Generate a unique affiliate code
 * Format: XXXXXXXX (e.g., A1B2C3D4)
 */
const generateAffiliateCode = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Removed confusing characters
  let code = '';
  
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return code;
};

/**
 * Generate a unique affiliate code and ensure it doesn't exist
 * @returns {Promise<string>} Unique affiliate code
 */
const generateUniqueAffiliateCode = async () => {
  let code;
  let attempts = 0;
  const maxAttempts = 10;
  
  do {
    code = generateAffiliateCode();
    attempts++;
    
    // Check if code exists
    const existingAffiliate = await Affiliate.findOne({ affiliateCode: code });
    
    if (!existingAffiliate) {
      return code;
    }
    
    if (attempts >= maxAttempts) {
      throw new Error('Failed to generate unique affiliate code after maximum attempts');
    }
  } while (true);
};

/**
 * Generate affiliate link
 * @param {string} affiliateCode - Affiliate code
 * @param {string} baseUrl - Base URL (default from env)
 * @returns {string} Full affiliate link
 */
const generateAffiliateLink = (affiliateCode, baseUrl = null) => {
  const url = baseUrl || process.env.CLIENT_URL || 'https://suicidenote.com';
  return `${url}/?ref=${affiliateCode}`;
};

/**
 * Generate campaign-specific affiliate link
 * @param {string} affiliateCode - Affiliate code
 * @param {string} campaignName - Campaign name
 * @param {Object} params - Additional parameters
 * @returns {string} Campaign affiliate link
 */
const generateCampaignLink = (affiliateCode, campaignName, params = {}) => {
  const baseLink = generateAffiliateLink(affiliateCode);
  const url = new URL(baseLink);
  
  url.searchParams.set('campaign', campaignName);
  
  // Add additional parameters
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value);
    }
  });
  
  return url.toString();
};

/**
 * Parse affiliate link parameters
 * @param {string} url - Affiliate URL
 * @returns {Object} Parsed parameters
 */
const parseAffiliateLink = (url) => {
  try {
    const parsedUrl = new URL(url);
    const params = {};
    
    parsedUrl.searchParams.forEach((value, key) => {
      params[key] = value;
    });
    
    return {
      affiliateCode: params.ref,
      campaign: params.campaign,
      medium: params.medium,
      source: params.source,
      params,
    };
  } catch (error) {
    console.error('Error parsing affiliate link:', error);
    return {};
  }
};

/**
 * Validate affiliate code format
 * @param {string} code - Affiliate code to validate
 * @returns {boolean} True if valid format
 */
const isValidAffiliateCodeFormat = (code) => {
  const pattern = /^[A-Z2-9]{8}$/;
  return pattern.test(code);
};

/**
 * Track affiliate click
 * @param {string} affiliateCode - Affiliate code
 * @param {Object} clickData - Click data
 * @returns {Promise<boolean>} True if tracked successfully
 */
const trackAffiliateClick = async (affiliateCode, clickData = {}) => {
  try {
    const affiliate = await Affiliate.findOne({ affiliateCode });
    
    if (!affiliate) {
      return false;
    }
    
    const {
      campaignName = null,
      ipAddress = null,
      userAgent = null,
      referrer = null,
      deviceType = null,
    } = clickData;
    
    // Add click to affiliate stats
    await affiliate.addClick(campaignName);
    
    // In production, you would log detailed click data
    console.log(`Affiliate click tracked: ${affiliateCode}`, {
      campaignName,
      ipAddress,
      userAgent,
      referrer,
      deviceType,
      timestamp: new Date(),
    });
    
    return true;
  } catch (error) {
    console.error('Error tracking affiliate click:', error);
    return false;
  }
};

/**
 * Calculate commission for a sale
 * @param {number} saleAmount - Sale amount in kobo
 * @param {number} commissionRate - Commission rate (default: 0.5 for 50%)
 * @returns {number} Commission amount in kobo
 */
const calculateCommission = (saleAmount, commissionRate = 0.5) => {
  return Math.floor(saleAmount * commissionRate);
};

/**
 * Generate affiliate dashboard URL
 * @param {string} affiliateCode - Affiliate code
 * @returns {string} Dashboard URL
 */
const generateDashboardUrl = (affiliateCode) => {
  const baseUrl = process.env.CLIENT_URL || 'https://suicidenote.com';
  return `${baseUrl}/affiliate/dashboard?code=${affiliateCode}`;
};

/**
 * Generate affiliate promotional materials
 * @param {Object} affiliate - Affiliate object
 * @returns {Object} Promotional materials
 */
const generatePromotionalMaterials = (affiliate) => {
  const baseLink = generateAffiliateLink(affiliate.affiliateCode);
  
  const materials = {
    links: {
      default: baseLink,
      twitter: `${baseLink}&medium=twitter`,
      facebook: `${baseLink}&medium=facebook`,
      whatsapp: `${baseLink}&medium=whatsapp`,
      email: `${baseLink}&medium=email`,
    },
    textTemplates: {
      twitter: `📚 Just finished reading "Suicide Note" - a powerful story about mental health and healing in Nigeria. Highly recommend! ${baseLink}`,
      facebook: `I recently read "Suicide Note" and it deeply resonated with me. It's an honest portrayal of mental health struggles in Nigeria. Check it out: ${baseLink}`,
      whatsapp: `Hey! I just read this amazing book called "Suicide Note". It's a powerful story about mental health in Nigeria. You should check it out: ${baseLink}`,
      email: `Subject: A Book That Changed My Perspective\n\nHi,\n\nI wanted to share a book that really impacted me - "Suicide Note" by Loba Yusuf. It's an honest and powerful story about mental health struggles in Nigeria.\n\nYou can get it here: ${baseLink}\n\nBest regards,\n${affiliate.user?.name || ''}`,
    },
    images: {
      banner: `${process.env.API_URL}/assets/affiliate-banner.png`,
      social: `${process.env.API_URL}/assets/affiliate-social.png`,
    },
    stats: {
      commissionRate: `${(affiliate.commissionRate * 100)}%`,
      commissionPerSale: `₦${calculateCommission(250000, affiliate.commissionRate) / 100}`,
      dashboard: generateDashboardUrl(affiliate.affiliateCode),
    },
  };
  
  return materials;
};

/**
 * Get affiliate performance metrics
 * @param {string} affiliateId - Affiliate ID
 * @returns {Promise<Object>} Performance metrics
 */
const getAffiliatePerformance = async (affiliateId) => {
  try {
    const affiliate = await Affiliate.findById(affiliateId);
    
    if (!affiliate) {
      return null;
    }
    
    // Calculate conversion rate
    const conversionRate = affiliate.totalReferrals > 0
      ? (affiliate.successfulReferrals / affiliate.totalReferrals) * 100
      : 0;
    
    // Calculate average commission per sale
    const avgCommission = affiliate.successfulReferrals > 0
      ? affiliate.totalEarnings / affiliate.successfulReferrals
      : 0;
    
    // Calculate earnings per click
    const earningsPerClick = affiliate.clicks > 0
      ? affiliate.totalEarnings / affiliate.clicks
      : 0;
    
    return {
      conversionRate: conversionRate.toFixed(2),
      averageCommission: Math.floor(avgCommission),
      earningsPerClick: Math.floor(earningsPerClick),
      clickThroughRate: affiliate.totalReferrals > 0
        ? (affiliate.clicks / affiliate.totalReferrals) * 100
        : 0,
      performance: affiliate.performance,
    };
  } catch (error) {
    console.error('Error getting affiliate performance:', error);
    return null;
  }
};

/**
 * Validate and process affiliate referral
 * @param {string} affiliateCode - Affiliate code
 * @param {Object} saleData - Sale data
 * @returns {Promise<Object>} Process result
 */
const processAffiliateReferral = async (affiliateCode, saleData) => {
  try {
    const affiliate = await Affiliate.findOne({ affiliateCode });
    
    if (!affiliate) {
      return {
        success: false,
        error: 'Affiliate not found',
      };
    }
    
    if (!affiliate.isActive) {
      return {
        success: false,
        error: 'Affiliate account is not active',
      };
    }
    
    const commissionAmount = calculateCommission(
      saleData.amount,
      affiliate.commissionRate
    );
    
    // Add successful referral
    await affiliate.addSuccessfulReferral(
      saleData.amount,
      commissionAmount,
      saleData.campaignName
    );
    
    return {
      success: true,
      commissionAmount,
      affiliateId: affiliate._id,
    };
  } catch (error) {
    console.error('Error processing affiliate referral:', error);
    return {
      success: false,
      error: 'Failed to process affiliate referral',
    };
  }
};

module.exports = {
  generateAffiliateCode,
  generateUniqueAffiliateCode,
  generateAffiliateLink,
  generateCampaignLink,
  parseAffiliateLink,
  isValidAffiliateCodeFormat,
  trackAffiliateClick,
  calculateCommission,
  generateDashboardUrl,
  generatePromotionalMaterials,
  getAffiliatePerformance,
  processAffiliateReferral,
};