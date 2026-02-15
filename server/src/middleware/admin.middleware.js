const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin.model');

const adminMiddleware = {
  /**
   * Verify admin token
   */
  async protect(req, res, next) {
    try {
      let token;

      // Check cookies first
      if (req.cookies.admin_token) {
        token = req.cookies.admin_token;
        console.log('🔑 Admin token found in cookies');
      }
      // Then check authorization header
      else if (req.headers.authorization?.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        console.log('🔑 Admin token found in headers');
      }

      if (!token) {
        console.log('❌ No admin token found');
        return res.status(401).json({ 
          success: false, 
          error: 'Not authorized to access this route' 
        });
      }

      try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('✅ Token decoded successfully:', { id: decoded.id, type: decoded.type });
        
        // Check if it's an admin token
        if (decoded.type !== 'admin') {
          console.log('❌ Token is not an admin token:', decoded.type);
          return res.status(403).json({ 
            success: false, 
            error: 'Invalid admin token' 
          });
        }

        // Get admin
        const admin = await Admin.findById(decoded.id).select('-password');
        
        if (!admin) {
          console.log('❌ Admin not found for ID:', decoded.id);
          return res.status(401).json({ 
            success: false, 
            error: 'Admin not found' 
          });
        }

        if (!admin.isActive) {
          console.log('❌ Admin account is deactivated:', admin.email);
          return res.status(403).json({ 
            success: false, 
            error: 'Account is deactivated' 
          });
        }

        console.log('✅ Admin authenticated:', admin.email);
        req.admin = admin;
        next();

      } catch (error) {
        if (error.name === 'TokenExpiredError') {
          console.log('❌ Token expired');
          return res.status(401).json({ 
            success: false, 
            error: 'Token expired',
            code: 'TOKEN_EXPIRED'
          });
        }
        if (error.name === 'JsonWebTokenError') {
          console.log('❌ Invalid token:', error.message);
          return res.status(401).json({ 
            success: false, 
            error: 'Invalid token',
            code: 'INVALID_TOKEN'
          });
        }
        console.log('❌ Token verification error:', error);
        throw error;
      }

    } catch (error) {
      console.error('🔥 Admin middleware error:', error);
      return res.status(401).json({ 
        success: false, 
        error: 'Not authorized to access this route' 
      });
    }
  },

  /**
   * Check if admin has specific role
   */
  restrictTo(...roles) {
    return (req, res, next) => {
      if (!req.admin) {
        return res.status(401).json({ 
          success: false, 
          error: 'Authentication required' 
        });
      }
      
      if (!roles.includes(req.admin.role)) {
        console.log(`❌ Admin ${req.admin.email} with role ${req.admin.role} tried to access restricted route`);
        return res.status(403).json({ 
          success: false, 
          error: 'You do not have permission to perform this action' 
        });
      }
      next();
    };
  },

  /**
   * Check if admin has specific permission
   */
  hasPermission(permission) {
    return (req, res, next) => {
      if (!req.admin) {
        return res.status(401).json({ 
          success: false, 
          error: 'Authentication required' 
        });
      }

      // Superadmin has all permissions
      if (req.admin.role === 'superadmin') {
        return next();
      }

      if (!req.admin.permissions || !req.admin.permissions.includes(permission)) {
        console.log(`❌ Admin ${req.admin.email} missing permission: ${permission}`);
        return res.status(403).json({ 
          success: false, 
          error: 'You do not have permission to perform this action' 
        });
      }
      next();
    };
  },

  /**
   * Check if admin is superadmin
   */
  isSuperAdmin(req, res, next) {
    if (!req.admin) {
      return res.status(401).json({ 
        success: false, 
        error: 'Authentication required' 
      });
    }

    if (req.admin.role !== 'superadmin') {
      console.log(`❌ Admin ${req.admin.email} is not superadmin`);
      return res.status(403).json({ 
        success: false, 
        error: 'Super admin access required' 
      });
    }
    next();
  },

  /**
   * Refresh token middleware
   */
  async refreshToken(req, res, next) {
    try {
      const refreshToken = req.cookies.admin_refresh_token;

      if (!refreshToken) {
        return res.status(401).json({ 
          success: false, 
          error: 'No refresh token' 
        });
      }

      const decoded = jwt.verify(
        refreshToken, 
        process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET
      );

      const admin = await Admin.findById(decoded.id).select('-password');
      
      if (!admin || !admin.isActive) {
        return res.status(401).json({ 
          success: false, 
          error: 'Invalid refresh token' 
        });
      }

      // Generate new token
      const newToken = admin.generateAuthToken();
      
      // Set new cookie
      res.cookie('admin_token', newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 24 * 60 * 60 * 1000 // 1 day
      });

      req.admin = admin;
      req.newToken = newToken;
      
      next();
    } catch (error) {
      console.log('❌ Refresh token error:', error.message);
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid refresh token' 
      });
    }
  },

  /**
   * Optional: Allow both admin and regular user tokens
   */
  async optionalAuth(req, res, next) {
    try {
      let token;

      if (req.cookies.admin_token) {
        token = req.cookies.admin_token;
      } else if (req.cookies.token) {
        token = req.cookies.token;
      }

      if (!token) {
        return next();
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      if (decoded.type === 'admin') {
        req.admin = await Admin.findById(decoded.id).select('-password');
      } else {
        // Dynamically require User model to avoid circular dependency
        const User = require('../models/User.model');
        req.user = await User.findById(decoded.id).select('-password');
      }
      
      next();
    } catch (error) {
      next();
    }
  }
};

module.exports = adminMiddleware;