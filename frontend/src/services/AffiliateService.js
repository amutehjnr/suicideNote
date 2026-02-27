import axios from 'axios';

const API_BASE_URL = '/api/v1';

// Helper function to get cookie
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

class AffiliateServiceClass {
  constructor() {
    this.authToken = null;
  }

  /**
   * Set auth token for affiliate requests
   */
  setAuthToken(token) {
    this.authToken = token;
    if (token) {
      axios.defaults.headers.common['x-affiliate-token'] = token;
    } else {
      delete axios.defaults.headers.common['x-affiliate-token'];
    }
  }

  /**
   * Get auth token
   */
  getAuthToken() {
    return this.authToken || localStorage.getItem('affiliate_token');
  }

  /**
   * Make authenticated request
   */
  async request(method, url, data = null) {
    try {
      const token = this.getAuthToken();
      
      const config = {
        method,
        url: `${API_BASE_URL}${url}`,
        headers: {
          'Content-Type': 'application/json',
          'x-affiliate-token': token
        },
        withCredentials: true
      };
      
      if (data && (method === 'post' || method === 'put')) {
        config.data = data;
      }
      
      const response = await axios(config);
      return response.data;
    } catch (error) {
      console.error(`❌ ${method.toUpperCase()} ${url} failed:`, error);
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Request failed',
        status: error.response?.status
      };
    }
  }

  /**
   * Register as an affiliate - FIXED: Now accepts email and name parameters
   */
  async registerAffiliate(email, name = '') {
    try {
      console.log('📝 Registering affiliate with email:', email, 'and name:', name);
      
      const response = await axios.post(
        `${API_BASE_URL}/affiliate/register`,
        { email, name }, // Send email and name in the request body
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log('✅ Register response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Register affiliate failed:', error);
      console.error('Error details:', error.response?.data);
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to register as affiliate',
        details: error.response?.data
      };
    }
  }

  /**
   * Get affiliate dashboard data
   */
  async getDashboard() {
    return this.request('get', '/affiliate/dashboard');
  }

  /**
   * Get earnings summary
   */
  async getEarnings() {
    return this.request('get', '/affiliate/earnings');
  }

  /**
   * Get referrals list
   */
  async getReferrals(page = 1, limit = 20) {
    return this.request('get', `/affiliate/referrals?page=${page}&limit=${limit}`);
  }

  /**
   * Get performance report
   */
  async getPerformanceReport(period = 'month') {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/affiliate/performance/${period}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error('❌ Get performance report failed:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch performance report'
      };
    }
  }

  /**
   * Get all campaigns
   */
  async getCampaigns() {
    return this.request('get', '/affiliate/campaigns');
  }

  /**
   * Create campaign
   */
  async createCampaign(campaignData) {
    return this.request('post', '/affiliate/campaigns', campaignData);
  }

  /**
   * Update bank details
   */
  async updateBankDetails(bankDetails) {
    return this.request('post', '/affiliate/bank-details', bankDetails);
  }

  /**
   * Get bank details
   */
  async getBankDetails() {
    return this.request('get', '/affiliate/bank-details');
  }

  /**
   * Request payout
   */
  async requestPayout(amount) {
    return this.request('post', '/affiliate/request-payout', { amount });
  }

  /**
   * Get payout history
   */
  async getPayoutHistory() {
    return this.request('get', '/affiliate/payouts');
  }

  /**
   * Generate campaign link
   */
  async generateCampaignLink(name, medium = null, source = null) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/affiliate/generate-link`,
        { name, medium, source },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error('❌ Generate campaign link failed:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to generate campaign link'
      };
    }
  }

  /**
   * Get leaderboard
   */
  async getLeaderboard(period = 'month', limit = 10) {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/affiliate/leaderboard?period=${period}&limit=${limit}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error('❌ Get leaderboard failed:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch leaderboard'
      };
    }
  }

  /**
   * Deactivate affiliate account
   */
  async deactivateAccount() {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/affiliate/deactivate`,
        {},
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error('❌ Deactivate account failed:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to deactivate account'
      };
    }
  }

  /**
   * Check if user is affiliate
   */
  async checkAffiliateStatus() {
    try {
      console.log('🔍 Checking affiliate status...');
      
      const token = this.getAuthToken();
      
      if (token) {
        const dashboardRes = await this.getDashboard();
        if (dashboardRes.success) {
          return {
            isAffiliate: true,
            data: dashboardRes.data
          };
        }
      }
      
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        if (user.role === 'affiliate') {
          return {
            isAffiliate: true,
            data: { user }
          };
        }
      }
      
      return {
        isAffiliate: false,
        data: null
      };
    } catch (error) {
      console.error('❌ Check affiliate status error:', error);
      return {
        isAffiliate: false,
        data: null
      };
    }
  }

  /**
   * Validate affiliate token
   */
  async validateToken(token) {
    try {
      const response = await axios.get(`${API_BASE_URL}/affiliate/token/info/${token}`);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Invalid token'
      };
    }
  }

  /**
   * Extract affiliate code from URL
   */
  getAffiliateCodeFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('ref');
  }

  /**
   * Extract campaign name from URL
   */
  getCampaignFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('campaign');
  }

  /**
   * Get affiliate code from cookie
   */
  getAffiliateCodeFromCookie() {
    return getCookie('affiliate_ref');
  }

  /**
   * Get campaign from cookie
   */
  getCampaignFromCookie() {
    return getCookie('affiliate_campaign');
  }

  /**
   * Generate affiliate link for sharing
   */
  generateShareLink(baseCode, campaignName = null, medium = null, source = null) {
    let link = `${window.location.origin}/?ref=${baseCode}`;
    
    if (campaignName) {
      link += `&campaign=${encodeURIComponent(campaignName)}`;
    }
    
    if (medium) {
      link += `&medium=${encodeURIComponent(medium)}`;
    }
    
    if (source) {
      link += `&source=${encodeURIComponent(source)}`;
    }
    
    return link;
  }
}

// Create and export a single instance
const AffiliateService = new AffiliateServiceClass();
export default AffiliateService;