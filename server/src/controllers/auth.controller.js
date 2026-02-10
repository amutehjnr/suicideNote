const authService = require('../services/auth.service');

const authController = {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;
      
      const ipAddress = req.ip;
      const userAgent = req.get('user-agent');
      
      const result = await authService.register(
        { name, email, password },
        ipAddress,
        userAgent
      );
      
      if (!result.success) {
        return res.status(400).json(result);
      }
      
      // Set token in HTTP-only cookie
      res.cookie('token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
      
      // Remove token from response body for security
      delete result.token;
      
      return res.status(201).json(result);
    } catch (error) {
      console.error('Register controller error:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      
      const ipAddress = req.ip;
      const userAgent = req.get('user-agent');
      
      const result = await authService.login(
        email,
        password,
        ipAddress,
        userAgent
      );
      
      if (!result.success) {
        return res.status(401).json(result);
      }
      
      // Set token in HTTP-only cookie
      res.cookie('token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
      
      // Remove token from response body for security
      delete result.token;
      
      return res.status(200).json(result);
    } catch (error) {
      console.error('Login controller error:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  },

  async logout(req, res) {
    try {
      // Clear token cookie
      res.clearCookie('token');
      
      return res.status(200).json({
        success: true,
        message: 'Logged out successfully',
      });
    } catch (error) {
      console.error('Logout controller error:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  },

  async verifyEmail(req, res) {
    try {
      const { token } = req.params;
      
      const result = await authService.verifyEmail(token);
      
      if (!result.success) {
        return res.status(400).json(result);
      }
      
      return res.status(200).json(result);
    } catch (error) {
      console.error('Verify email controller error:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  },

  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      
      const result = await authService.forgotPassword(email);
      
      if (!result.success) {
        return res.status(400).json(result);
      }
      
      return res.status(200).json(result);
    } catch (error) {
      console.error('Forgot password controller error:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  },

  async resetPassword(req, res) {
    try {
      const { token, password } = req.body;
      
      const result = await authService.resetPassword(token, password);
      
      if (!result.success) {
        return res.status(400).json(result);
      }
      
      return res.status(200).json(result);
    } catch (error) {
      console.error('Reset password controller error:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  },

  async becomeAffiliate(req, res) {
    try {
      const userId = req.user._id;
      
      const result = await authService.becomeAffiliate(userId);
      
      if (!result.success) {
        return res.status(400).json(result);
      }
      
      return res.status(200).json(result);
    } catch (error) {
      console.error('Become affiliate controller error:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  },

  async getProfile(req, res) {
    try {
      const user = req.user;
      
      // Populate affiliate info if user is affiliate
      if (user.role === 'affiliate' && user.affiliateId) {
        await user.populate('affiliateId');
      }
      
      return res.status(200).json({
        success: true,
        data: authService.sanitizeUser(user),
      });
    } catch (error) {
      console.error('Get profile controller error:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  },

  async updateProfile(req, res) {
    try {
      const userId = req.user._id;
      const updateData = req.body;
      
      const result = await authService.updateProfile(userId, updateData);
      
      if (!result.success) {
        return res.status(400).json(result);
      }
      
      return res.status(200).json(result);
    } catch (error) {
      console.error('Update profile controller error:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  },

  async changePassword(req, res) {
    try {
      const userId = req.user._id;
      const { currentPassword, newPassword } = req.body;
      
      const result = await authService.changePassword(
        userId,
        currentPassword,
        newPassword
      );
      
      if (!result.success) {
        return res.status(400).json(result);
      }
      
      return res.status(200).json(result);
    } catch (error) {
      console.error('Change password controller error:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  },

  async validateToken(req, res) {
    try {
      const token = req.cookies.token || 
                   (req.headers.authorization && req.headers.authorization.split(' ')[1]);
      
      if (!token) {
        return res.status(200).json({
          success: false,
          isAuthenticated: false,
        });
      }
      
      const result = await authService.validateToken(token);
      
      if (!result.success) {
        return res.status(200).json({
          success: false,
          isAuthenticated: false,
        });
      }
      
      return res.status(200).json({
        success: true,
        isAuthenticated: true,
        user: result.user,
      });
    } catch (error) {
      console.error('Validate token controller error:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  },
};

module.exports = authController;