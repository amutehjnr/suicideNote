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
      }
      // Then check authorization header
      else if (req.headers.authorization?.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
      }

      if (!token) {
        return res.status(401).json({ 
          success: false, 
          error: 'Not authorized to access this route' 
        });
      }

      try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Check if it's an admin token
        if (decoded.type !== 'admin') {
          return res.status(403).json({ 
            success: false, 
            error: 'Invalid admin token' 
          });
        }

        // Get admin
        const admin = await Admin.findById(decoded.id).select('-password');
        
        if (!admin) {
          return res.status(401).json({ 
            success: false, 
            error: 'Admin not found' 
          });
        }

        if (!admin.isActive) {
          return res.status(403).json({ 
            success: false, 
            error: 'Account is deactivated' 
          });
        }

        req.admin = admin;
        next();

      } catch (error) {
        if (error.name === 'TokenExpiredError') {
          return res.status(401).json({ 
            success: false, 
            error: 'Token expired',
            code: 'TOKEN_EXPIRED'
          });
        }
        throw error;
      }

    } catch (error) {
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
      if (!roles.includes(req.admin.role)) {
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
      if (!req.admin.hasPermission(permission)) {
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
    if (req.admin.role !== 'superadmin') {
      return res.status(403).json({ 
        success: false, 
        error: 'Super admin access required' 
      });
    }
    next();
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
        req.user = await User.findById(decoded.id).select('-password');
      }
      
      next();
    } catch (error) {
      next();
    }
  }
};

module.exports = adminMiddleware;