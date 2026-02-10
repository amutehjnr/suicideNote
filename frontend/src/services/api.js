import axios from 'axios';
import toast from 'react-hot-toast';

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 10000, // 10 second timeout
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor with better error handling
api.interceptors.response.use(
  (response) => {
    // Log successful responses in development
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ API Response:', {
        url: response.config.url,
        status: response.status,
        data: response.data
      });
    }
    return response;
  },
  (error) => {
    const { response } = error;
    
    // Log error in development
    if (process.env.NODE_ENV === 'development') {
      console.error('❌ API Error:', {
        url: error.config?.url,
        status: response?.status,
        data: response?.data,
        message: error.message
      });
    }
    
    if (response) {
      switch (response.status) {
        case 401:
          // Unauthorized - redirect to login
          if (!window.location.pathname.includes('/login')) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
          }
          break;
        
        case 403:
          toast.error('You do not have permission to perform this action');
          break;
        
        case 404:
          // Don't show toast for 404, let components handle it
          console.log('Resource not found:', error.config.url);
          break;
        
        case 422:
          // Validation error
          const errors = response.data.errors || {};
          Object.values(errors).forEach((errorMsg) => {
            toast.error(errorMsg);
          });
          break;
        
        case 500:
          toast.error('Server error. Please try again later.');
          break;
        
        default:
          toast.error(response.data?.message || 'An error occurred');
      }
    } else if (error.code === 'ECONNABORTED') {
      toast.error('Request timeout. Please check your connection.');
    } else if (!navigator.onLine) {
      toast.error('No internet connection. Please check your network.');
    } else {
      toast.error('Network error. Please check your connection.');
    }
    
    return Promise.reject(error);
  }
);

// API endpoints
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (data) => api.post('/auth/reset-password', data),
  verifyEmail: (token) => api.get(`/auth/verify-email/${token}`),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data),
  becomeAffiliate: () => api.post('/auth/become-affiliate'),
  validateToken: () => api.get('/auth/validate-token'),
};

export const ebookAPI = {
  getAll: (params) => api.get('/ebooks', { params }),
  getById: (id) => api.get(`/ebooks/${id}`),
  getPreview: (id) => api.get(`/ebooks/${id}/preview`),
  getContent: (id, code) => api.get(`/ebooks/${id}/content`, { params: { code } }),
  getReviews: (id, params) => api.get(`/ebooks/${id}/reviews`, { params }),
  addReview: (id, data) => api.post(`/ebooks/${id}/reviews`, data),
  markHelpful: (id, reviewId) => api.post(`/ebooks/${id}/reviews/${reviewId}/helpful`),
  search: (query) => api.get('/ebooks/search', { params: { query } }),
  getFeatured: () => api.get('/ebooks/featured'),
  getCategories: () => api.get('/ebooks/categories'),
  validateAccessCode: (code) => api.post('/ebooks/validate-access-code', { code }),
  getReadingProgress: (id) => api.get(`/ebooks/${id}/progress`),
  saveReadingProgress: (id, data) => api.post(`/ebooks/${id}/progress`, data),
  
  // Debug endpoints
  testConnection: () => api.get('/ebooks/debug/test-route'),
  checkEbook: (id) => api.get(`/ebooks/debug/check-ebook/${id}`),
};

export const paymentAPI = {
  // Change this to accept full data object
  initialize: (data) => api.post('/payments/initialize', data),
  verify: (data) => api.post('/payments/verify', data), // Accepts { reference, email }
  getPurchases: () => api.get('/payments/purchases'),
  getPurchase: (id) => api.get(`/payments/purchases/${id}`),
  requestRefund: (data) => api.post('/payments/request-refund', data),
  validateAccessCode: (data) => api.post('/payments/validate-access-code', data),
  getBanks: () => api.get('/payments/banks'),
  trackAffiliateClick: (affiliateCode, campaignName) => 
    api.get('/payments/track-click', { params: { affiliateCode, campaignName } }),
};

export const affiliateAPI = {
  getEarnings: () => api.get('/payments/affiliate/earnings'),
  getStats: () => api.get('/payments/affiliate/stats'),
  requestPayout: (amount) => api.post('/payments/affiliate/request-payout', { amount }),
  updateBankDetails: (data) => api.put('/payments/affiliate/bank-details', data),
  generateLink: (data) => api.post('/payments/affiliate/generate-link', data),
};

export const readAPI = {
  getSession: (ebookId) => api.get(`/ebooks/${ebookId}/read/session`),
  getChapter: (ebookId, chapterIndex) => api.get(`/ebooks/${ebookId}/read/chapter/${chapterIndex}`),
  savePosition: (ebookId, data) => api.post(`/ebooks/${ebookId}/read/position`, data),
  getStats: (ebookId) => api.get(`/ebooks/${ebookId}/read/stats`),
  searchInEbook: (ebookId, query) => api.get(`/ebooks/${ebookId}/read/search`, { params: { query } }),
  getTOC: (ebookId) => api.get(`/ebooks/${ebookId}/read/toc`),
  getBookmarks: (ebookId) => api.get(`/ebooks/${ebookId}/read/bookmarks`),
  addBookmark: (ebookId, data) => api.post(`/ebooks/${ebookId}/read/bookmarks`, data),
  removeBookmark: (ebookId, bookmarkId) => api.delete(`/ebooks/${ebookId}/read/bookmarks/${bookmarkId}`),
  exportHighlights: (ebookId, format) => api.get(`/ebooks/${ebookId}/read/export`, { params: { format } }),
  validateAccess: (ebookId, code) => api.get(`/ebooks/${ebookId}/read/validate`, { params: { code } }),
};

// Test connection on startup
export const testAPIConnection = async () => {
  try {
    const response = await api.get('/health');
    console.log('✅ API Connection successful:', response.data);
    return true;
  } catch (error) {
    console.error('❌ API Connection failed:', error.message);
    return false;
  }
};

export default api;