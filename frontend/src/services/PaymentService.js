// /src/services/PaymentService.js - UPDATED VERSION (Database-only validation)
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/v1';

console.log('🔗 PaymentService initialized with API_URL:', API_BASE_URL);

const PaymentService = {
  /**
   * Validate access code - DATABASE ONLY (no local storage)
   */
  async validateAccessCode(code, ebookId = 'suicide-note-2026') {
    try {
      const cleanCode = code.trim().toUpperCase();
      console.log('🔑 [PaymentService] Validating access code in DATABASE:', { 
        code: cleanCode, 
        ebookId 
      });
      
      // Clear any previous local storage for security
      localStorage.removeItem(`ebook_access_${ebookId}`);
      localStorage.removeItem('recent_purchase');
      
      // ONLY use backend validation - no fallback
      const result = await this.validateAccessCodeBackend(cleanCode, ebookId);
      
      if (result.success) {
        console.log('✅ Database validation successful');
        
        // Only save to localStorage AFTER successful database validation
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
      
      // Database validation failed
      console.log('❌ Database validation failed:', result.error);
      return {
        success: false,
        error: result.error || 'Invalid access code',
        shouldRedirect: false
      };
      
    } catch (error) {
      console.error('🔥 [PaymentService] Access code validation error:', error);
      return {
        success: false,
        error: 'Failed to validate access code. Please try again.',
        shouldRedirect: false
      };
    }
  },

  /**
   * Backend validation ONLY
   */
  async validateAccessCodeBackend(code, ebookSlug = 'suicide-note-2026') {
  try {
    console.log('🔑 [Database] Validating code:', { 
      code, 
      ebookSlug 
    });
    
    // Try multiple endpoints
    const endpoints = [
      `${API_BASE_URL}/payments/validate-access-code`
    ];
    
    for (const endpoint of endpoints) {
      try {
        console.log('🔗 Trying endpoint:', endpoint);
        
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code: code.trim().toUpperCase(),
            ebookSlug: ebookSlug // Make sure this is being sent
          })
        });
        
        console.log('📊 Response status:', response.status, 'from:', endpoint);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.log('❌ Endpoint failed:', endpoint, errorData);
          continue; // Try next endpoint
        }
        
        const data = await response.json();
        console.log('✅ Database validation response:', data);
        
        return data;
        
      } catch (endpointError) {
        console.log('🔌 Endpoint connection error:', endpoint, endpointError.message);
      }
    }
    
    // All endpoints failed
    return {
      success: false,
      error: 'Cannot connect to validation server',
      isDatabaseError: true
    };
    
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
   * Initialize payment
   */
  // In PaymentService.js - initializePayment method
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
    
    // Prepare the data for backend
    const backendData = {
      ebookId: paymentData.ebookId,
      email: paymentData.email,
      name: paymentData.name || paymentData.email.split('@')[0],
      amount: Number(paymentData.amount),
      affiliateCode: paymentData.affiliateCode || null,
      // ⚠️ FIX: Always provide a string for campaignName
      campaignName: paymentData.campaignName || 'direct-purchase', // Default value
      callback_url: paymentData.callback_url || `${window.location.origin}/payment-callback`
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
    
    // Fix port if needed
    if (response.data?.data?.authorizationUrl) {
      let authUrl = response.data.data.authorizationUrl;
      console.log('🔗 Original authorization URL:', authUrl);
      
      if (authUrl.includes('localhost:3000')) {
        authUrl = authUrl.replace('localhost:3000', 'localhost:5173');
        response.data.data.authorizationUrl = authUrl;
        console.log('✅ Fixed authorization URL:', authUrl);
      }
    }
    
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
   * Helper: Check if user already has access
   */
  hasExistingAccess(ebookId = 'suicide-note-2026') {
    const storedCode = localStorage.getItem(`ebook_access_${ebookId}`);
    if (storedCode) {
      console.log('⚠️ Found stored code:', storedCode);
      console.log('⚠️ Note: This requires re-validation with database');
      return {
        hasAccess: false, // Force re-validation
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
  },

  /**
   * Test database connection
   */
  async testDatabaseConnection() {
    try {
      const response = await fetch(`${API_BASE_URL}/payments/access/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: 'TEST',
          ebookId: 'test'
        })
      });
      
      console.log('🔗 Database test response:', response.status);
      
      if (response.status === 401) {
        return {
          success: false,
          error: 'Route requires authentication (remove authMiddleware.protect)'
        };
      }
      
      return {
        success: response.ok,
        status: response.status
      };
      
    } catch (error) {
      console.error('❌ Database test failed:', error);
      return { success: false, error: error.message };
    }
  }
};

export default PaymentService;