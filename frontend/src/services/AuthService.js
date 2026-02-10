// services/AuthService.js
import { authAPI } from './api';
import toast from 'react-hot-toast';

class AuthService {
  // Register user (supports guest checkout)
  async register(userData) {
    try {
      const response = await authAPI.register(userData);
      
      if (response.data.success) {
        const { token, user } = response.data.data;
        
        // Store token and user data
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        // Set auth header
        this.setAuthHeader(token);
        
        toast.success(userData.isGuest 
          ? 'Account created! Proceeding to payment...' 
          : 'Registration successful! Welcome!'
        );
        
        return { success: true, data: user, token };
      }
      
      toast.error(response.data.error || 'Registration failed');
      return { success: false, error: response.data.error };
    } catch (error) {
      console.error('Registration error:', error);
      
      let errorMessage = 'Registration failed';
      if (error.response?.status === 400) {
        errorMessage = error.response.data.error || 'Invalid registration data';
      } else if (error.response?.status === 409) {
        errorMessage = 'Email already exists. Please login instead.';
      }
      
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  }

  // Login user
  async login(email, password) {
    try {
      const response = await authAPI.login({ email, password });
      
      if (response.data.success) {
        const { token, user } = response.data.data;
        
        // Store token and user data
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        // Set auth header
        this.setAuthHeader(token);
        
        toast.success('Login successful! Welcome back!');
        
        return { success: true, data: user, token };
      }
      
      toast.error(response.data.error || 'Login failed');
      return { success: false, error: response.data.error };
    } catch (error) {
      console.error('Login error:', error);
      
      let errorMessage = 'Login failed';
      if (error.response?.status === 401) {
        errorMessage = 'Invalid email or password';
      } else if (error.response?.status === 403) {
        errorMessage = 'Account not verified. Please check your email.';
      }
      
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  }

  // Quick guest registration (for purchase flow)
  async quickGuestRegistration(email, name = '') {
    try {
      // Generate a random password for guest
      const randomPassword = Math.random().toString(36).slice(-8) + Date.now().toString(36);
      
      const response = await authAPI.register({
        email,
        name: name || email.split('@')[0],
        password: randomPassword,
        isGuest: true
      });
      
      if (response.data.success) {
        const { token, user } = response.data.data;
        
        // Store minimal guest data
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify({
          _id: user._id,
          email: user.email,
          name: user.name,
          role: 'user',
          isGuest: true,
          isVerified: true
        }));
        
        // Set auth header
        this.setAuthHeader(token);
        
        return { success: true, data: user, token };
      }
      
      return { success: false, error: response.data.error };
    } catch (error) {
      console.error('Quick guest registration error:', error);
      return { success: false, error: 'Guest registration failed' };
    }
  }

  // Logout user
  logout() {
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Clear auth header
    this.setAuthHeader(null);
    
    toast.success('Logged out successfully');
    
    // Redirect to home page
    window.location.href = '/';
  }

  // Get current user
  getCurrentUser() {
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) return null;
      
      const user = JSON.parse(userStr);
      
      // Ensure user has required properties
      return {
        _id: user._id || user.id,
        email: user.email,
        name: user.name || 'Guest',
        role: user.role || 'user',
        isVerified: user.isVerified !== false,
        isGuest: user.isGuest || false,
        profilePicture: user.profilePicture,
        ...user
      };
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }

  // Get auth token
  getToken() {
    return localStorage.getItem('token');
  }

  // Check if user is authenticated
  isAuthenticated() {
    const token = this.getToken();
    const user = this.getCurrentUser();
    
    return !!(token && user && user._id);
  }

  // Check if user is affiliate
  isAffiliate() {
    const user = this.getCurrentUser();
    return user && user.role === 'affiliate';
  }

  // Set auth header for API calls
  setAuthHeader(token) {
    // This is handled by axios interceptor in api.js
    // Just a placeholder for future use
  }

  // Update user profile
  async updateProfile(profileData) {
    try {
      const response = await authAPI.updateProfile(profileData);
      
      if (response.data.success) {
        // Update local storage
        const currentUser = this.getCurrentUser();
        const updatedUser = { ...currentUser, ...response.data.data.user };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        toast.success('Profile updated successfully');
        return { success: true, data: updatedUser };
      }
      
      toast.error(response.data.error || 'Update failed');
      return { success: false, error: response.data.error };
    } catch (error) {
      console.error('Update profile error:', error);
      toast.error('Failed to update profile');
      return { success: false, error: 'Update failed' };
    }
  }

  // Become affiliate
  async becomeAffiliate() {
    try {
      const response = await authAPI.becomeAffiliate();
      
      if (response.data.success) {
        // Update local storage
        const currentUser = this.getCurrentUser();
        const updatedUser = { 
          ...currentUser, 
          role: 'affiliate',
          affiliateId: response.data.data.affiliate._id,
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        toast.success('Welcome to our affiliate program!');
        return { success: true, data: response.data.data };
      }
      
      toast.error(response.data.error || 'Failed to become affiliate');
      return { success: false, error: response.data.error };
    } catch (error) {
      console.error('Become affiliate error:', error);
      toast.error('Failed to become affiliate');
      return { success: false, error: 'Failed to become affiliate' };
    }
  }

  // Validate token (check if session is valid)
  async validateToken() {
    try {
      const response = await authAPI.validateToken();
      return { success: true, data: response.data };
    } catch (error) {
      // If token is invalid, clear local storage
      if (error.response?.status === 401) {
        this.logout();
      }
      return { success: false, error: 'Session expired' };
    }
  }

  // Forgot password
  async forgotPassword(email) {
    try {
      const response = await authAPI.forgotPassword(email);
      
      if (response.data.success) {
        toast.success('Password reset link sent to your email');
        return { success: true };
      }
      
      toast.error(response.data.error || 'Failed to send reset email');
      return { success: false, error: response.data.error };
    } catch (error) {
      console.error('Forgot password error:', error);
      toast.error('Failed to send reset email');
      return { success: false, error: 'Failed to send reset email' };
    }
  }

  // Reset password
  async resetPassword(token, password) {
    try {
      const response = await authAPI.resetPassword({ token, password });
      
      if (response.data.success) {
        toast.success('Password reset successful');
        return { success: true };
      }
      
      toast.error(response.data.error || 'Password reset failed');
      return { success: false, error: response.data.error };
    } catch (error) {
      console.error('Reset password error:', error);
      toast.error('Password reset failed');
      return { success: false, error: 'Password reset failed' };
    }
  }

  // Check if user has purchased specific ebook
  async hasPurchasedEbook(ebookId) {
    try {
      const user = this.getCurrentUser();
      if (!user) return false;
      
      // This would typically call an API endpoint
      // For now, we'll check localStorage for access codes
      const accessCode = localStorage.getItem(`ebook_access_${ebookId}`);
      return !!accessCode;
    } catch (error) {
      console.error('Check purchase error:', error);
      return false;
    }
  }
}

export default new AuthService();