// import axios from 'axios';

// const API_BASE_URL = '/api/v1';

// console.log('🔗 PaymentService initialized with API_URL:', API_BASE_URL);

// // Helper function to get cookie
// const getCookie = (name) => {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
//   return null;
// };

// const PaymentService = {
//   /**
//    * Get currency options
//    */
//   async getCurrencyOptions() {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/payments/currency-options`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ Failed to get currency options:', error);
//       return {
//         success: false,
//         error: 'Failed to get currency options'
//       };
//     }
//   },

//   /**
//    * Validate access code
//    */
//   async validateAccessCode(code, ebookId = 'suicide-note-2026') {
//     try {
//       const cleanCode = code.trim().toUpperCase();
//       console.log('🔑 Validating access code:', { code: cleanCode, ebookId });
      
//       const response = await axios.post(`${API_BASE_URL}/payments/validate-access-code`, {
//         code: cleanCode,
//         ebookSlug: ebookId
//       });
      
//       if (response.data.success) {
//         localStorage.setItem(`ebook_access_${ebookId}`, cleanCode);
//       }
      
//       return response.data;
//     } catch (error) {
//       console.error('❌ Validation error:', error);
//       return {
//         success: false,
//         error: error.response?.data?.error || 'Failed to validate access code'
//       };
//     }
//   },

//   /**
//    * Get affiliate code from cookie
//    */
//   getAffiliateCodeFromCookie() {
//     return getCookie('affiliate_ref');
//   },

//   /**
//    * Get campaign from cookie
//    */
//   getCampaignFromCookie() {
//     return getCookie('affiliate_campaign');
//   },

//   /**
//    * Initialize payment with currency support and affiliate tracking
//    */
//   async initializePayment(paymentData) {
//     try {
//       // Get affiliate code from cookie if not provided in paymentData
//       if (!paymentData.affiliateCode) {
//         paymentData.affiliateCode = this.getAffiliateCodeFromCookie();
//       }
      
//       // Get campaign from cookie if not provided
//       if (!paymentData.campaignName) {
//         paymentData.campaignName = this.getCampaignFromCookie();
//       }
      
//       console.log('📤 Sending payment request with affiliate:', {
//         affiliateCode: paymentData.affiliateCode,
//         campaignName: paymentData.campaignName
//       });
      
//       const response = await axios.post(
//         `${API_BASE_URL}/payments/initialize`,
//         paymentData,
//         {
//           headers: { 
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//           },
//           withCredentials: true,
//         }
//       );

//       console.log('✅ Backend response:', response.data);
//       return response.data;
      
//     } catch (error) {
//       console.error('❌ Payment initialization failed:', error.response?.data || error.message);
      
//       return {
//         success: false,
//         error: error.response?.data?.error || error.message || 'Payment initialization failed',
//         details: error.response?.data?.details,
//         status: error.response?.status
//       };
//     }
//   },

//   /**
//    * Verify payment
//    */
//   async verifyPayment(reference) {
//     try {
//       console.log('🔗 Verifying payment with reference:', reference);
      
//       const response = await axios.post(
//         `${API_BASE_URL}/payments/verify`,
//         { reference },
//         {
//           headers: { 'Content-Type': 'application/json' },
//           withCredentials: true,
//         }
//       );
      
//       console.log('✅ Verification response:', response.data);
      
//       if (response.data.success && response.data.data?.accessCode) {
//         localStorage.setItem('ebook_access_suicide-note-2026', response.data.data.accessCode);
//       }
      
//       return response.data;
      
//     } catch (error) {
//       console.error('❌ Payment verification failed:', error);
//       return {
//         success: false,
//         error: error.response?.data?.error || error.message || 'Payment verification failed',
//       };
//     }
//   },

//   /**
//    * Get user purchases
//    */
//   async getUserPurchases() {
//     try {
//       const response = await axios.get(
//         `${API_BASE_URL}/payments/purchases`,
//         { withCredentials: true }
//       );
//       return response.data;
//     } catch (error) {
//       console.error('Get purchases failed:', error);
//       return { success: false, error: 'Failed to fetch purchases' };
//     }
//   },

//   /**
//    * Track affiliate click
//    */
//   async trackAffiliateClick(affiliateCode) {
//     try {
//       const response = await axios.get(
//         `${API_BASE_URL}/payments/track-click`,
//         { params: { affiliateCode }, withCredentials: true }
//       );
//       return response.data;
//     } catch (error) {
//       console.error('Track affiliate click failed:', error);
//       return { success: false, error: 'Failed to track affiliate click' };
//     }
//   },

//   /**
//    * Check if user already has access
//    */
//   hasExistingAccess(ebookId = 'suicide-note-2026') {
//     const storedCode = localStorage.getItem(`ebook_access_${ebookId}`);
//     if (storedCode) {
//       return {
//         hasAccess: false,
//         accessCode: storedCode,
//         needsRevalidation: true
//       };
//     }
//     return { hasAccess: false };
//   },

//   /**
//    * Clear all access codes
//    */
//   clearAllAccessCodes() {
//     const allKeys = Object.keys(localStorage);
//     allKeys.forEach(key => {
//       if (key.startsWith('ebook_access_')) {
//         localStorage.removeItem(key);
//       }
//     });
//     localStorage.removeItem('recent_purchase');
//     console.log('🧹 All local access codes cleared');
//     return { success: true };
//   }
// };

// export default PaymentService;


import axios from 'axios';

const API_BASE_URL = '/api/v1';

console.log('🔗 PaymentService initialized with API_URL:', API_BASE_URL);

// Helper function to get cookie
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

const PaymentService = {
  /**
   * Get Selar checkout URL
   */
  async getSelarCheckoutUrl(email, name, affiliateCode) {
    try {
      const params = new URLSearchParams();
      if (email) params.append('email', email);
      if (name) params.append('name', name);
      if (affiliateCode) params.append('affiliateCode', affiliateCode);
      
      const response = await axios.get(
        `${API_BASE_URL}/payments/selar/checkout?${params.toString()}`,
        { withCredentials: true }
      );
      
      return response.data;
    } catch (error) {
      console.error('❌ Failed to get Selar checkout URL:', error);
      return {
        success: false,
        error: 'Failed to get checkout URL'
      };
    }
  },

  /**
   * Verify Selar payment
   */
  async verifySelarPayment(transactionId, email, name) {
    try {
      console.log('🔍 Verifying Selar payment:', { transactionId, email });
      
      const response = await axios.post(
        `${API_BASE_URL}/payments/selar/verify`,
        { 
          transaction_id: transactionId,
          email: email || '',
          name: name || ''
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      
      console.log('✅ Selar verification response:', response.data);
      
      if (response.data.success && response.data.accessCode) {
        localStorage.setItem('ebook_access_suicide-note-2026', response.data.accessCode);
        localStorage.setItem('recent_purchase', JSON.stringify({
          purchase: response.data.purchase,
          accessCode: response.data.accessCode
        }));
      }
      
      return response.data;
      
    } catch (error) {
      console.error('❌ Selar payment verification failed:', error);
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Selar verification failed',
      };
    }
  },

  /**
   * Get affiliate code from cookie
   */
  getAffiliateCodeFromCookie() {
    return getCookie('affiliate_ref');
  },

  /**
   * Get campaign from cookie
   */
  getCampaignFromCookie() {
    return getCookie('affiliate_campaign');
  },

  /**
   * Redirect to Selar checkout
   */
  async redirectToSelarCheckout(email, name, affiliateCode) {
    try {
      const result = await this.getSelarCheckoutUrl(email, name, affiliateCode);
      
      if (result.success && result.data?.checkoutUrl) {
        window.location.href = result.data.checkoutUrl;
        return { success: true };
      } else {
        console.error('Failed to get checkout URL:', result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Redirect to Selar failed:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Validate access code
   */
  async validateAccessCode(code, ebookId = 'suicide-note-2026') {
    try {
      const cleanCode = code.trim().toUpperCase();
      console.log('🔑 Validating access code:', { code: cleanCode, ebookId });
      
      const response = await axios.post(`${API_BASE_URL}/payments/validate-access-code`, {
        code: cleanCode,
        ebookSlug: ebookId
      });
      
      if (response.data.success) {
        localStorage.setItem(`ebook_access_${ebookId}`, cleanCode);
      }
      
      return response.data;
    } catch (error) {
      console.error('❌ Validation error:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to validate access code'
      };
    }
  },

  /**
   * Check if user already has access
   */
  hasExistingAccess(ebookId = 'suicide-note-2026') {
    const storedCode = localStorage.getItem(`ebook_access_${ebookId}`);
    if (storedCode) {
      return {
        hasAccess: true,
        accessCode: storedCode
      };
    }
    return { hasAccess: false };
  },

  /**
   * Clear all access codes
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
    return { success: true };
  }
};

export default PaymentService;