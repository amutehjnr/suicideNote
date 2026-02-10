// src/utils/helpers.js

/**
 * Dynamically load Paystack script
 * @param {string} publicKey - Paystack public key
 * @returns {Promise} Promise that resolves when script is loaded
 */
export const loadPaystackScript = (publicKey) => {
  return new Promise((resolve, reject) => {
    // Check if script is already loaded
    if (window.PaystackPop) {
      resolve();
      return;
    }

    // Create script element
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    
    script.onload = () => {
      resolve();
    };
    
    script.onerror = () => {
      reject(new Error('Failed to load Paystack script'));
    };
    
    document.head.appendChild(script);
  });
};

/**
 * Format currency for display
 * @param {number} amount - Amount in kobo
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(amount / 100);
};

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} Whether email is valid
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Generate a unique reference
 * @param {string} prefix - Reference prefix
 * @returns {string} Unique reference
 */
export const generateReference = (prefix = 'PAY') => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `${prefix}_${timestamp}_${random}`;
};

/**
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
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
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise} Promise that resolves when text is copied
 */
export const copyToClipboard = (text) => {
  return navigator.clipboard.writeText(text);
};

/**
 * Get current date in YYYY-MM-DD format
 * @returns {string} Formatted date
 */
export const getCurrentDate = () => {
  return new Date().toISOString().split('T')[0];
};