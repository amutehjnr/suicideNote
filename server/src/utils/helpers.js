const crypto = require('crypto');
const winston = require('winston');

/**
 * Generate a random string of specified length
 * @param {number} length - Length of string
 * @returns {string} Random string
 */
const generateRandomString = (length = 32) => {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
};

/**
 * Generate a unique transaction reference
 * @param {string} prefix - Reference prefix
 * @returns {string} Transaction reference
 */
const generateTransactionReference = (prefix = 'SN') => {
  const timestamp = Date.now();
  const random = crypto.randomBytes(4).toString('hex').toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
};

/**
 * Format currency amount
 * @param {number} amount - Amount in kobo
 * @param {string} currency - Currency code
 * @returns {string} Formatted amount
 */
const formatCurrency = (amount, currency = 'NGN') => {
  const formatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency,
  });
  
  // Convert from kobo to main unit (e.g., kobo to Naira)
  const mainUnit = amount / 100;
  return formatter.format(mainUnit);
};

/**
 * Format date to readable string
 * @param {Date|string} date - Date to format
 * @param {string} format - Format style
 * @returns {string} Formatted date
 */
const formatDate = (date, format = 'relative') => {
  const dateObj = new Date(date);
  
  if (format === 'relative') {
    const now = new Date();
    const diffMs = now - dateObj;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    
    if (diffSec < 60) return 'just now';
    if (diffMin < 60) return `${diffMin} minute${diffMin !== 1 ? 's' : ''} ago`;
    if (diffHour < 24) return `${diffHour} hour${diffHour !== 1 ? 's' : ''} ago`;
    if (diffDay < 7) return `${diffDay} day${diffDay !== 1 ? 's' : ''} ago`;
    
    return dateObj.toLocaleDateString();
  }
  
  if (format === 'short') {
    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }
  
  if (format === 'long') {
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
  
  return dateObj.toISOString();
};

/**
 * Calculate reading time in minutes
 * @param {string} text - Text content
 * @param {number} wordsPerMinute - Reading speed
 * @returns {number} Reading time in minutes
 */
const calculateReadingTime = (text, wordsPerMinute = 200) => {
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

/**
 * Generate pagination metadata
 * @param {number} page - Current page
 * @param {number} limit - Items per page
 * @param {number} total - Total items
 * @returns {Object} Pagination metadata
 */
const generatePagination = (page, limit, total) => {
  const totalPages = Math.ceil(total / limit);
  
  return {
    page: parseInt(page),
    limit: parseInt(limit),
    total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
    nextPage: page < totalPages ? page + 1 : null,
    prevPage: page > 1 ? page - 1 : null,
  };
};

/**
 * Generate SEO-friendly slug
 * @param {string} text - Text to slugify
 * @returns {string} SEO-friendly slug
 */
const generateSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/--+/g, '-') // Replace multiple hyphens with single
    .trim();
};

/**
 * Mask sensitive information
 * @param {string} data - Data to mask
 * @param {string} type - Type of data (email, phone, card)
 * @returns {string} Masked data
 */
const maskSensitiveData = (data, type = 'email') => {
  if (!data) return '';
  
  switch (type) {
    case 'email':
      const [username, domain] = data.split('@');
      if (username.length <= 2) {
        return `${username[0]}***@${domain}`;
      }
      return `${username[0]}***${username.slice(-1)}@${domain}`;
      
    case 'phone':
      return data.replace(/(\d{4})\d{4}(\d{2})/, '$1****$2');
      
    case 'card':
      return data.replace(/(\d{4})\d{8}(\d{4})/, '$1********$2');
      
    case 'bankAccount':
      return data.replace(/(\d{4})\d{4}(\d{2})/, '$1****$2');
      
    default:
      return data;
  }
};

/**
 * Validate and parse JSON
 * @param {string} jsonString - JSON string to parse
 * @param {any} defaultValue - Default value if parsing fails
 * @returns {any} Parsed JSON or default value
 */
const safeJsonParse = (jsonString, defaultValue = null) => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    winston.warn('Failed to parse JSON:', error.message);
    return defaultValue;
  }
};

/**
 * Deep clone object
 * @param {Object} obj - Object to clone
 * @returns {Object} Cloned object
 */
const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  if (typeof obj === 'object') {
    const cloned = {};
    Object.keys(obj).forEach(key => {
      cloned[key] = deepClone(obj[key]);
    });
    return cloned;
  }
  return obj;
};

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Generate cache key
 * @param {string} prefix - Cache key prefix
 * @param {Object} params - Cache parameters
 * @returns {string} Cache key
 */
const generateCacheKey = (prefix, params = {}) => {
  const sortedParams = Object.keys(params)
    .sort()
    .map(key => `${key}=${params[key]}`)
    .join('&');
  
  return `${prefix}:${sortedParams ? sortedParams : 'default'}`;
};

/**
 * Calculate percentage
 * @param {number} part - Part value
 * @param {number} total - Total value
 * @returns {number} Percentage
 */
const calculatePercentage = (part, total) => {
  if (total === 0) return 0;
  return Math.round((part / total) * 100);
};

/**
 * Generate unique filename
 * @param {string} originalname - Original filename
 * @returns {string} Unique filename
 */
const generateUniqueFilename = (originalname) => {
  const ext = originalname.split('.').pop();
  const timestamp = Date.now();
  const random = crypto.randomBytes(8).toString('hex');
  return `${timestamp}-${random}.${ext}`;
};

/**
 * Validate and sanitize HTML
 * @param {string} html - HTML to sanitize
 * @returns {string} Sanitized HTML
 */
const sanitizeHtml = (html) => {
  // Basic HTML sanitization - in production, use a library like DOMPurify
  const allowedTags = ['b', 'i', 'u', 'strong', 'em', 'p', 'br', 'ul', 'ol', 'li', 'a'];
  const allowedAttributes = {
    a: ['href', 'title', 'target'],
  };
  
  // Simple regex-based sanitization (for demonstration)
  // In production, use a proper HTML sanitizer
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/javascript:/gi, '');
};

/**
 * Generate order summary text
 * @param {Object} order - Order object
 * @returns {string} Order summary
 */
const generateOrderSummary = (order) => {
  const items = order.items || [];
  const total = formatCurrency(order.total || 0, order.currency || 'NGN');
  
  let summary = `Order #${order.reference || order._id}\n`;
  summary += `Date: ${formatDate(order.createdAt, 'long')}\n`;
  summary += `Status: ${order.status || 'pending'}\n\n`;
  summary += 'Items:\n';
  
  items.forEach((item, index) => {
    summary += `${index + 1}. ${item.name || 'Item'} - ${formatCurrency(item.price || 0, order.currency || 'NGN')}\n`;
  });
  
  summary += `\nTotal: ${total}\n`;
  
  if (order.shippingAddress) {
    summary += `\nShipping to: ${order.shippingAddress}\n`;
  }
  
  return summary;
};

/**
 * Generate password reset token
 * @returns {string} Reset token
 */
const generatePasswordResetToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

/**
 * Generate verification code (for email/SMS)
 * @param {number} length - Code length
 * @returns {string} Verification code
 */
const generateVerificationCode = (length = 6) => {
  const digits = '0123456789';
  let code = '';
  
  for (let i = 0; i < length; i++) {
    code += digits[Math.floor(Math.random() * digits.length)];
  }
  
  return code;
};

/**
 * Calculate age from birth date
 * @param {Date|string} birthDate - Birth date
 * @returns {number} Age in years
 */
const calculateAge = (birthDate) => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

/**
 * Convert object to query string
 * @param {Object} params - Parameters object
 * @returns {string} Query string
 */
const objectToQueryString = (params) => {
  return Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
};

/**
 * Parse query string to object
 * @param {string} queryString - Query string
 * @returns {Object} Parameters object
 */
const queryStringToObject = (queryString) => {
  const params = {};
  
  if (!queryString) return params;
  
  queryString.replace('?', '').split('&').forEach(pair => {
    const [key, value] = pair.split('=');
    if (key && value !== undefined) {
      params[decodeURIComponent(key)] = decodeURIComponent(value);
    }
  });
  
  return params;
};

/**
 * Check if value is empty
 * @param {any} value - Value to check
 * @returns {boolean} True if empty
 */
const isEmpty = (value) => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string' && value.trim() === '') return true;
  if (Array.isArray(value) && value.length === 0) return true;
  if (typeof value === 'object' && Object.keys(value).length === 0) return true;
  return false;
};

/**
 * Delay execution
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise} Promise that resolves after delay
 */
const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

module.exports = {
  generateRandomString,
  generateTransactionReference,
  formatCurrency,
  formatDate,
  calculateReadingTime,
  truncateText,
  generatePagination,
  generateSlug,
  maskSensitiveData,
  safeJsonParse,
  deepClone,
  debounce,
  throttle,
  generateCacheKey,
  calculatePercentage,
  generateUniqueFilename,
  sanitizeHtml,
  generateOrderSummary,
  generatePasswordResetToken,
  generateVerificationCode,
  calculateAge,
  objectToQueryString,
  queryStringToObject,
  isEmpty,
  delay,
};