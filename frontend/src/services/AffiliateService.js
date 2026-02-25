// src/services/AffiliateService.js
import axios from 'axios';

const API_BASE_URL = '/api/v1';

const AffiliateService = {
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
    try {
      const response = await axios.get(
        `${API_BASE_URL}/affiliate/dashboard`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error('❌ Get dashboard failed:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch dashboard'
      };
    }
  },

  /**
   * Get earnings summary
   */
  async getEarnings() {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/affiliate/earnings`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error('❌ Get earnings failed:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch earnings'
      };
    }
  },

  /**
   * Get referrals list
   */
  async getReferrals(page = 1, limit = 20) {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/affiliate/referrals?page=${page}&limit=${limit}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error('❌ Get referrals failed:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch referrals'
      };
    }
  },

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
  },

  /**
   * Create campaign
   */
  async createCampaign(campaignData) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/affiliate/campaigns`,
        campaignData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error('❌ Create campaign failed:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to create campaign'
      };
    }
  },

  /**
   * Get all campaigns
   */
  async getCampaigns() {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/affiliate/campaigns`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error('❌ Get campaigns failed:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch campaigns'
      };
    }
  },

  /**
   * Get campaign analytics
   */
  async getCampaignAnalytics(campaignName) {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/affiliate/campaigns/${encodeURIComponent(campaignName)}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error('❌ Get campaign analytics failed:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch campaign analytics'
      };
    }
  },

  /**
   * Update bank details
   */
  async updateBankDetails(bankDetails) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/affiliate/bank-details`,
        bankDetails,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error('❌ Update bank details failed:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to update bank details'
      };
    }
  },

  /**
   * Get bank details
   */
  async getBankDetails() {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/affiliate/bank-details`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error('❌ Get bank details failed:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch bank details'
      };
    }
  },

  /**
   * Request payout
   */
  async requestPayout(amount) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/affiliate/request-payout`,
        { amount },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error('❌ Request payout failed:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to request payout'
      };
    }
  },

  /**
   * Update settings
   */
  async updateSettings(settings) {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/affiliate/settings`,
        settings,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error('❌ Update settings failed:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to update settings'
      };
    }
  },

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
  },

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
  },

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
  },

  /**
   * Check if user is affiliate
   */
  async checkAffiliateStatus() {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/affiliate/dashboard`,
        { withCredentials: true }
      );
      return {
        isAffiliate: response.data.success,
        data: response.data.data
      };
    } catch (error) {
      return {
        isAffiliate: false,
        data: null
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