// src/services/AffiliateService.js
import axios from 'axios';

const API_BASE_URL = '/api/v1';

let authToken = null;

const AffiliateService = {
  /**
   * Set the authentication token for all requests
   */
  setAuthToken(token) {
    authToken = token;
  },

  /**
   * Get the auth token
   */
  getAuthToken() {
    return authToken;
  },

  /**
   * Make an authenticated request
   */
  async request(method, url, data = null) {
    try {
      const config = {
        method,
        url: `${API_BASE_URL}${url}`,
        headers: {
          'Content-Type': 'application/json',
          'x-affiliate-token': authToken
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
  },

  /**
   * Register as an affiliate
   */
  async registerAffiliate() {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/affiliate/register`,
        {},
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error('❌ Register affiliate failed:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to register as affiliate'
      };
    }
  },

  /**
   * Get affiliate dashboard data
   */
  async getDashboard() {
    return this.request('get', '/affiliate/dashboard');
  },

  /**
   * Get earnings summary
   */
  async getEarnings() {
    return this.request('get', '/affiliate/earnings');
  },

  /**
   * Get referrals list
   */
  async getReferrals(page = 1, limit = 20) {
    return this.request('get', `/affiliate/referrals?page=${page}&limit=${limit}`);
  },

  /**
   * Get campaigns
   */
  async getCampaigns() {
    return this.request('get', '/affiliate/campaigns');
  },

  /**
   * Create campaign
   */
  async createCampaign(campaignData) {
    return this.request('post', '/affiliate/campaigns', campaignData);
  },

  /**
   * Update bank details
   */
  async updateBankDetails(bankDetails) {
    return this.request('post', '/affiliate/bank-details', bankDetails);
  },

  /**
   * Get bank details
   */
  async getBankDetails() {
    return this.request('get', '/affiliate/bank-details');
  },

  /**
   * Request payout
   */
  async requestPayout(amount) {
    return this.request('post', '/affiliate/request-payout', { amount });
  },

  /**
   * Get payout history
   */
  async getPayoutHistory() {
    return this.request('get', '/affiliate/payouts');
  },

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
  },

  /**
   * Extract affiliate code from URL
   */
  getAffiliateCodeFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('ref');
  },

  /**
   * Extract campaign name from URL
   */
  getCampaignFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('campaign');
  },

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
};

export default AffiliateService;