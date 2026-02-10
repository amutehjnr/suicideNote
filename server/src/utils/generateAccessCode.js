const crypto = require('crypto');
const AccessCode = require('../models/AccessCode.model');

/**
 * Generate a unique access code for ebook access
 * Format: SN-XXXX-XXXX (e.g., SN-A1B2-C3D4)
 */
const generateAccessCode = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Removed confusing characters (0, O, I, 1)
  let code = 'SN-';
  
  // Generate two groups of 4 characters
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 4; j++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    if (i === 0) code += '-';
  }
  
  return code;
};

/**
 * Generate a unique access code and ensure it doesn't exist in the database
 * @returns {Promise<string>} Unique access code
 */
const generateUniqueAccessCode = async () => {
  let code;
  let attempts = 0;
  const maxAttempts = 10;
  
  do {
    code = generateAccessCode();
    attempts++;
    
    // Check if code exists
    const existingCode = await AccessCode.findOne({ code });
    
    if (!existingCode) {
      return code;
    }
    
    if (attempts >= maxAttempts) {
      throw new Error('Failed to generate unique access code after maximum attempts');
    }
  } while (true);
};

/**
 * Calculate expiry date for access code
 * @param {number} days - Number of days until expiry (default: 365)
 * @returns {Date} Expiry date
 */
const calculateExpiryDate = (days = 365) => {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + days);
  return expiryDate;
};

/**
 * Validate access code format
 * @param {string} code - Access code to validate
 * @returns {boolean} True if valid format
 */
const isValidAccessCodeFormat = (code) => {
  const pattern = /^SN-[A-Z2-9]{4}-[A-Z2-9]{4}$/;
  return pattern.test(code);
};

/**
 * Create access code record in database
 * @param {Object} data - Access code data
 * @param {string} data.userId - User ID
 * @param {string} data.ebookId - Ebook ID
 * @param {string} data.purchaseId - Purchase ID
 * @param {number} data.daysValid - Number of days code is valid
 * @returns {Promise<Object>} Created access code
 */
const createAccessCode = async ({ userId, ebookId, purchaseId, daysValid = 365 }) => {
  try {
    const code = await generateUniqueAccessCode();
    const expiresAt = calculateExpiryDate(daysValid);
    
    const accessCode = await AccessCode.create({
      code,
      user: userId,
      ebook: ebookId,
      purchase: purchaseId,
      expiresAt,
      isActive: true,
    });
    
    return accessCode;
  } catch (error) {
    console.error('Error creating access code:', error);
    throw error;
  }
};

/**
 * Verify access code validity
 * @param {string} code - Access code to verify
 * @param {string} ebookId - Ebook ID
 * @returns {Promise<Object>} Verification result
 */
const verifyAccessCode = async (code, ebookId = null) => {
  try {
    if (!isValidAccessCodeFormat(code)) {
      return {
        valid: false,
        error: 'Invalid access code format',
      };
    }
    
    const query = { code, isActive: true };
    if (ebookId) {
      query.ebook = ebookId;
    }
    
    const accessCode = await AccessCode.findOne(query)
      .populate('user', 'name email')
      .populate('ebook', 'title author');
    
    if (!accessCode) {
      return {
        valid: false,
        error: 'Access code not found',
      };
    }
    
    // Check expiry
    const now = new Date();
    if (now > accessCode.expiresAt) {
      return {
        valid: false,
        error: 'Access code has expired',
        expired: true,
        expiresAt: accessCode.expiresAt,
      };
    }
    
    return {
      valid: true,
      accessCode,
      expiresAt: accessCode.expiresAt,
      user: accessCode.user,
      ebook: accessCode.ebook,
    };
  } catch (error) {
    console.error('Error verifying access code:', error);
    return {
      valid: false,
      error: 'Error verifying access code',
    };
  }
};

/**
 * Revoke access code
 * @param {string} code - Access code to revoke
 * @returns {Promise<boolean>} True if successful
 */
const revokeAccessCode = async (code) => {
  try {
    const result = await AccessCode.updateOne(
      { code },
      { $set: { isActive: false } }
    );
    
    return result.modifiedCount > 0;
  } catch (error) {
    console.error('Error revoking access code:', error);
    return false;
  }
};

/**
 * Extend access code expiry
 * @param {string} code - Access code to extend
 * @param {number} additionalDays - Additional days to add
 * @returns {Promise<boolean>} True if successful
 */
const extendAccessCode = async (code, additionalDays = 30) => {
  try {
    const accessCode = await AccessCode.findOne({ code });
    
    if (!accessCode) {
      return false;
    }
    
    const newExpiryDate = new Date(accessCode.expiresAt);
    newExpiryDate.setDate(newExpiryDate.getDate() + additionalDays);
    
    accessCode.expiresAt = newExpiryDate;
    await accessCode.save();
    
    return true;
  } catch (error) {
    console.error('Error extending access code:', error);
    return false;
  }
};

/**
 * Get user's access codes
 * @param {string} userId - User ID
 * @returns {Promise<Array>} List of access codes
 */
const getUserAccessCodes = async (userId) => {
  try {
    const accessCodes = await AccessCode.find({ user: userId })
      .populate('ebook', 'title author coverImage')
      .sort({ createdAt: -1 });
    
    return accessCodes;
  } catch (error) {
    console.error('Error getting user access codes:', error);
    return [];
  }
};

/**
 * Get access code statistics
 * @returns {Promise<Object>} Statistics
 */
const getAccessCodeStats = async () => {
  try {
    const total = await AccessCode.countDocuments();
    const active = await AccessCode.countDocuments({ isActive: true });
    const expired = await AccessCode.countDocuments({
      isActive: true,
      expiresAt: { $lt: new Date() },
    });
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayCreated = await AccessCode.countDocuments({
      createdAt: { $gte: today },
    });
    
    return {
      total,
      active,
      expired,
      todayCreated,
    };
  } catch (error) {
    console.error('Error getting access code stats:', error);
    return {};
  }
};

module.exports = {
  generateAccessCode,
  generateUniqueAccessCode,
  calculateExpiryDate,
  isValidAccessCodeFormat,
  createAccessCode,
  verifyAccessCode,
  revokeAccessCode,
  extendAccessCode,
  getUserAccessCodes,
  getAccessCodeStats,
};