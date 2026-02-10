const Joi = require('joi');

// Common validation patterns
const patterns = {
  email: /^\S+@\S+\.\S+$/,
  phone: /^[0-9]{10,15}$/,
  nigerianPhone: /^(0|\\+234)[789][01]\\d{8}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  url: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
  bankAccount: /^[0-9]{10}$/,
  amount: /^[0-9]+$/,
  accessCode: /^SN-[A-Z2-9]{4}-[A-Z2-9]{4}$/,
  affiliateCode: /^[A-Z2-9]{8}$/,
};

// Common validation schemas
const schemas = {
  // User validation
  register: Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().pattern(patterns.email).required(),
    password: Joi.string().min(6).required(),
    // password: Joi.string().pattern(patterns.password).required()
    //   .messages({
    //     'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    //   }),
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),

  updateProfile: Joi.object({
    name: Joi.string().min(2).max(50),
    phone: Joi.string().pattern(patterns.phone).allow(''),
    bio: Joi.string().max(500).allow(''),
    profilePicture: Joi.string().uri().allow(''),
    socialLinks: Joi.object({
      twitter: Joi.string().uri().allow(''),
      facebook: Joi.string().uri().allow(''),
      instagram: Joi.string().uri().allow(''),
      linkedin: Joi.string().uri().allow(''),
    }),
  }),

  changePassword: Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required(),
  }),

  // Ebook validation
  createEbook: Joi.object({
    title: Joi.string().min(2).max(200).required(),
    slug: Joi.string().pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).required(),
    author: Joi.string().min(2).max(100).required(),
    description: Joi.string().min(50).required(),
    shortDescription: Joi.string().max(200).required(),
    price: Joi.number().min(0).required(),
    discountPrice: Joi.number().min(0).max(Joi.ref('price')),
    category: Joi.string().valid('fiction', 'non-fiction', 'self-help', 'mental-health', 'biography').required(),
    tags: Joi.array().items(Joi.string()).max(10),
    isPublished: Joi.boolean(),
    isFeatured: Joi.boolean(),
    affiliateCommissionRate: Joi.number().min(0).max(1).default(0.5),
  }),

  updateEbook: Joi.object({
    title: Joi.string().min(2).max(200),
    author: Joi.string().min(2).max(100),
    description: Joi.string().min(50),
    shortDescription: Joi.string().max(200),
    price: Joi.number().min(0),
    discountPrice: Joi.number().min(0).max(Joi.ref('price')),
    category: Joi.string().valid('fiction', 'non-fiction', 'self-help', 'mental-health', 'biography'),
    tags: Joi.array().items(Joi.string()).max(10),
    isPublished: Joi.boolean(),
    isFeatured: Joi.boolean(),
    affiliateCommissionRate: Joi.number().min(0).max(1),
  }),

  review: Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().max(1000).allow(''),
  }),

  // Payment validation
  initializePayment: Joi.object({
    ebookId: Joi.string().hex().length(24).required(),
    affiliateCode: Joi.string().pattern(patterns.affiliateCode).allow(''),
    campaignName: Joi.string().max(50).allow(''),
  }),

  verifyPayment: Joi.object({
    reference: Joi.string().required(),
  }),

  accessCode: Joi.object({
    code: Joi.string().pattern(patterns.accessCode).required(),
    ebookId: Joi.string().hex().length(24).required(),
  }),

  refund: Joi.object({
    purchaseId: Joi.string().hex().length(24).required(),
    reason: Joi.string().min(10).max(500).required(),
  }),

  // Affiliate validation
  becomeAffiliate: Joi.object({
    acceptTerms: Joi.boolean().valid(true).required(),
  }),

  bankDetails: Joi.object({
    accountNumber: Joi.string().pattern(patterns.bankAccount).required(),
    accountName: Joi.string().min(2).max(100).required(),
    bankCode: Joi.string().required(),
    bankName: Joi.string().required(),
  }),

  payoutRequest: Joi.object({
    amount: Joi.number().min(5000).required(), // Minimum ₦5000
  }),

  campaign: Joi.object({
    name: Joi.string().min(2).max(50).required(),
    description: Joi.string().max(200).allow(''),
    medium: Joi.string().valid('twitter', 'facebook', 'whatsapp', 'email', 'blog', 'other'),
    source: Joi.string().max(50).allow(''),
  }),

  // Reading validation
  readingProgress: Joi.object({
    lastPage: Joi.number().min(1).required(),
    lastChapter: Joi.string().required(),
  }),

  bookmark: Joi.object({
    chapterIndex: Joi.number().min(0).required(),
    note: Joi.string().max(500).allow(''),
    color: Joi.string().valid('yellow', 'blue', 'green', 'pink', 'purple'),
  }),

  // Search validation
  search: Joi.object({
    query: Joi.string().min(2).required(),
    page: Joi.number().min(1).default(1),
    limit: Joi.number().min(1).max(100).default(10),
    sort: Joi.string().valid('popular', 'rating', 'price_low', 'price_high', 'newest'),
    category: Joi.string(),
  }),

  // Admin validation
  adminCreateUser: Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('user', 'affiliate', 'admin').default('user'),
    isVerified: Joi.boolean().default(false),
  }),

  adminUpdateUser: Joi.object({
    name: Joi.string().min(2).max(50),
    email: Joi.string().email(),
    role: Joi.string().valid('user', 'affiliate', 'admin'),
    isVerified: Joi.boolean(),
    isActive: Joi.boolean(),
  }),

  adminStats: Joi.object({
    startDate: Joi.date(),
    endDate: Joi.date(),
    groupBy: Joi.string().valid('day', 'week', 'month', 'year'),
  }),
};

// Custom validation functions
const validators = {
  // Validate Nigerian phone number
  validateNigerianPhone: (phone) => {
    return patterns.nigerianPhone.test(phone);
  },

  // Validate amount (in kobo)
  validateAmount: (amount) => {
    if (typeof amount !== 'number' || amount < 0) {
      return false;
    }
    
    // Ensure amount is in whole kobo (no decimals)
    return Number.isInteger(amount);
  },

  // Validate currency
  validateCurrency: (currency) => {
    const validCurrencies = ['NGN', 'USD', 'EUR', 'GBP'];
    return validCurrencies.includes(currency);
  },

  // Validate email domain (allowlist/blocklist)
  validateEmailDomain: (email, allowedDomains = []) => {
    if (allowedDomains.length === 0) return true;
    
    const domain = email.split('@')[1];
    return allowedDomains.includes(domain);
  },

  // Validate password strength
  validatePasswordStrength: (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[@$!%*?&]/.test(password);
    
    return {
      isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar,
      issues: {
        minLength: password.length >= minLength,
        hasUpperCase,
        hasLowerCase,
        hasNumbers,
        hasSpecialChar,
      },
    };
  },

  // Sanitize input
  sanitizeInput: (input) => {
    if (typeof input === 'string') {
      // Trim whitespace
      let sanitized = input.trim();
      
      // Remove excessive whitespace
      sanitized = sanitized.replace(/\s+/g, ' ');
      
      // Escape HTML entities
      const entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;',
      };
      
      sanitized = sanitized.replace(/[&<>"'/]/g, (char) => entityMap[char]);
      
      return sanitized;
    }
    
    return input;
  },

  // Validate and sanitize object
  sanitizeObject: (obj, fields) => {
    const sanitized = {};
    
    fields.forEach(field => {
      if (obj[field] !== undefined) {
        sanitized[field] = validators.sanitizeInput(obj[field]);
      }
    });
    
    return sanitized;
  },

  // Validate file upload
  validateFileUpload: (file, options = {}) => {
    const {
      allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
      maxSize = 5 * 1024 * 1024, // 5MB
    } = options;
    
    if (!file) {
      return { isValid: false, error: 'No file provided' };
    }
    
    if (!allowedTypes.includes(file.mimetype)) {
      return { isValid: false, error: 'Invalid file type' };
    }
    
    if (file.size > maxSize) {
      return { isValid: false, error: 'File too large' };
    }
    
    // Validate image dimensions if it's an image
    if (file.mimetype.startsWith('image/')) {
      // This would require image processing library in production
      // For now, we just check mimetype
    }
    
    return { isValid: true };
  },

  // Validate URL
  validateUrl: (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  // Validate date range
  validateDateRange: (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return false;
    }
    
    if (start > end) {
      return false;
    }
    
    // Check if range is not too large (e.g., 1 year max)
    const maxRange = 365 * 24 * 60 * 60 * 1000; // 1 year in milliseconds
    if (end - start > maxRange) {
      return false;
    }
    
    return true;
  },

  // Validate pagination parameters
  validatePagination: (page, limit, maxLimit = 100) => {
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    
    if (pageNum < 1) return { isValid: false, error: 'Page must be at least 1' };
    if (limitNum < 1) return { isValid: false, error: 'Limit must be at least 1' };
    if (limitNum > maxLimit) return { isValid: false, error: `Limit cannot exceed ${maxLimit}` };
    
    return {
      isValid: true,
      page: pageNum,
      limit: limitNum,
      skip: (pageNum - 1) * limitNum,
    };
  },

  // Validate sort parameters
  validateSort: (sortField, allowedFields = [], defaultSort = { createdAt: -1 }) => {
    if (!sortField) return defaultSort;
    
    const [field, order] = sortField.split(':');
    const sortOrder = order === 'asc' ? 1 : -1;
    
    if (!allowedFields.includes(field)) {
      return defaultSort;
    }
    
    return { [field]: sortOrder };
  },

  // Validate filter parameters
  validateFilter: (filters, allowedFilters = {}) => {
    const validatedFilters = {};
    
    Object.entries(filters).forEach(([key, value]) => {
      if (allowedFilters[key]) {
        // Apply validation based on filter type
        switch (allowedFilters[key].type) {
          case 'string':
            if (typeof value === 'string' && value.trim()) {
              validatedFilters[key] = value.trim();
            }
            break;
            
          case 'number':
            const num = Number(value);
            if (!isNaN(num)) {
              validatedFilters[key] = num;
            }
            break;
            
          case 'boolean':
            if (value === 'true' || value === 'false') {
              validatedFilters[key] = value === 'true';
            } else if (typeof value === 'boolean') {
              validatedFilters[key] = value;
            }
            break;
            
          case 'date':
            const date = new Date(value);
            if (!isNaN(date.getTime())) {
              validatedFilters[key] = date;
            }
            break;
            
          case 'array':
            if (Array.isArray(value)) {
              validatedFilters[key] = value;
            } else if (typeof value === 'string') {
              validatedFilters[key] = value.split(',').map(item => item.trim());
            }
            break;
        }
      }
    });
    
    return validatedFilters;
  },
};

// Export all validators and schemas
module.exports = {
  patterns,
  schemas,
  ...validators,
};