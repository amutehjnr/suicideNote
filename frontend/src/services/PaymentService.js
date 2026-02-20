import axios from 'axios';

const API_BASE_URL = '/api/v1';

console.log('🔗 PaymentService initialized with API_URL:', API_BASE_URL);

const PaymentService = {
  /**
   * Get currency options
   */
  async getCurrencyOptions() {
    try {
      const response = await axios.get(`${API_BASE_URL}/payments/currency-options`);
      return response.data;
    } catch (error) {
      console.error('❌ Failed to get currency options:', error);
      return {
        success: false,
        error: 'Failed to get currency options'
      };
    }
  },

  /**
   * Validate access code - DATABASE ONLY
   */
  async validateAccessCode(code, ebookId = 'suicide-note-2026') {
    try {
      const cleanCode = code.trim().toUpperCase();
      console.log('🔑 [PaymentService] Validating access code in DATABASE:', { 
        code: cleanCode, 
        ebookId 
      });
      
      localStorage.removeItem(`ebook_access_${ebookId}`);
      localStorage.removeItem('recent_purchase');
      
      const result = await this.validateAccessCodeBackend(cleanCode, ebookId);
      
      if (result.success) {
        console.log('✅ Database validation successful');
        localStorage.setItem(`ebook_access_${ebookId}`, cleanCode);
        
        return {
          success: true,
          data: {
            ...result.data,
            accessCode: cleanCode,
            validatedBy: 'database'
          }
        };
      }
      
      console.log('❌ Database validation failed:', result.error);
      return {
        success: false,
        error: result.error || 'Invalid access code',
      };
      
    } catch (error) {
      console.error('🔥 [PaymentService] Access code validation error:', error);
      return {
        success: false,
        error: 'Failed to validate access code. Please try again.',
      };
    }
  },

  /**
   * Backend validation
   */
  async validateAccessCodeBackend(code, ebookSlug = 'suicide-note-2026') {
    try {
      console.log('🔑 [Database] Validating code:', { code, ebookSlug });
      
      const response = await fetch(`${API_BASE_URL}/payments/validate-access-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code.trim().toUpperCase(),
          ebookSlug: ebookSlug
        })
      });
      
      const data = await response.json();
      console.log('✅ Database validation response:', data);
      
      return data;
      
    } catch (error) {
      console.error('🔥 [Database] Network error:', error);
      return {
        success: false,
        error: 'Cannot connect to database server',
        isDatabaseError: true
      };
    }
  },

  /**
   * Initialize payment with currency support
   */
  async initializePayment(paymentData) {
    try {
      console.log('📤 [PaymentService] Sending payment request:', paymentData);
      
      // Validate required fields
      if (!paymentData.ebookId) {
        return { success: false, error: 'ebookId is required' };
      }
      
      if (!paymentData.email) {
        return { success: false, error: 'Email is required' };
      }
      
      if (!paymentData.amount || paymentData.amount <= 0) {
        return { success: false, error: 'Valid amount is required' };
      }
      
      const isLocalhost = window.location.hostname.includes('localhost');
      
      // Prepare the data for backend
      const backendData = {
        ebookId: paymentData.ebookId,
        email: paymentData.email,
        name: paymentData.name || paymentData.email.split('@')[0],
        amount: Number(paymentData.amount),
        currency: paymentData.currency || 'NGN', // Add currency
        affiliateCode: paymentData.affiliateCode || null,
        campaignName: paymentData.campaignName || 'direct-purchase',
      };
      
      console.log('🔗 Endpoint:', `${API_BASE_URL}/payments/initialize`);
      console.log('📦 Sending to backend:', backendData);
      
      const response = await axios.post(
        `${API_BASE_URL}/payments/initialize`,
        backendData,
        {
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          withCredentials: true,
          timeout: 30000,
        }
      );

      console.log('✅ Backend response:', response.data);
      
      return response.data;
      
    } catch (error) {
      console.error('❌ Payment initialization failed:', error.response?.data || error.message);
      
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Payment initialization failed',
        details: error.response?.data?.details,
        status: error.response?.status
      };
    }
  },

  /**
   * Verify payment
   */
  async verifyPayment(reference) {
    try {
      console.log('🔗 Verifying payment with reference:', reference);
      
      const response = await axios.post(
        `${API_BASE_URL}/payments/verify`,
        { reference },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      
      console.log('✅ Verification response:', response.data);
      return response.data;
      
    } catch (error) {
      console.error('❌ Payment verification failed:', error);
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Payment verification failed',
      };
    }
  },

  /**
   * Get user purchases
   */
  async getUserPurchases() {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/payments/purchases`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error('Get purchases failed:', error);
      return { success: false, error: 'Failed to fetch purchases' };
    }
  },

  /**
   * Track affiliate click
   */
  async trackAffiliateClick(affiliateCode) {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/payments/track-click`,
        { params: { affiliateCode }, withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error('Track affiliate click failed:', error);
      return { success: false, error: 'Failed to track affiliate click' };
    }
  },

  /**
   * Check if user already has access
   */
  hasExistingAccess(ebookId = 'suicide-note-2026') {
    const storedCode = localStorage.getItem(`ebook_access_${ebookId}`);
    if (storedCode) {
      console.log('⚠️ Found stored code:', storedCode);
      return {
        hasAccess: false,
        accessCode: storedCode,
        needsRevalidation: true
      };
    }
    
    return { hasAccess: false };
  },

  /**
   * Clear ALL access codes from localStorage
   */
  clearAllAccessCodes() {
    const allKeys = Object.keys(localStorage);
    allKeys.forEach(key => {
      if (key.startsWith('ebook_access_')) {
        localStorage.removeItem(key);
      }
    });
    localStorage.removeItem('recent_purchase');
    
    console.log('🧹 All local access codes cleared');
    
    return {
      success: true,
      message: 'All local access codes cleared. Database validation required.'
    };
  }
};

export default PaymentService;