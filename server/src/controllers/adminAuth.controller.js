const Admin = require('../models/Admin.model');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const emailService = require('../services/email.service');
const winston = require('winston');

// Cookie options for admin
const ADMIN_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
  domain: process.env.NODE_ENV === 'production' ? '.onrender.com' : undefined,
  maxAge: 24 * 60 * 60 * 1000 // 1 day
};

const adminAuthController = {
  /**
   * Admin Sign In Page (renders HTML)
   */
  async getSignInPage(req, res) {
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Admin Sign In - Suicide Note</title>
        <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
        <meta http-equiv="Pragma" content="no-cache">
        <meta http-equiv="Expires" content="0">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }

          body {
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
          }

          .container {
            width: 100%;
            max-width: 420px;
          }

          .card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          }

          .logo {
            text-align: center;
            margin-bottom: 30px;
          }

          .logo h1 {
            font-size: 28px;
            color: #333;
            margin-bottom: 5px;
          }

          .logo p {
            color: #666;
            font-size: 14px;
          }

          .form-group {
            margin-bottom: 20px;
          }

          label {
            display: block;
            margin-bottom: 8px;
            color: #555;
            font-weight: 500;
            font-size: 14px;
          }

          .input-wrapper {
            position: relative;
          }

          .input-wrapper i {
            position: absolute;
            left: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: #999;
          }

          input {
            width: 100%;
            padding: 15px 15px 15px 45px;
            border: 2px solid #e0e0e0;
            border-radius: 12px;
            font-size: 15px;
            transition: all 0.3s;
            background: white;
          }

          input:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
          }

          .password-toggle {
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
            color: #999;
          }

          .remember-forgot {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }

          .remember {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #666;
          }

          .forgot-link {
            color: #667eea;
            text-decoration: none;
            font-size: 14px;
          }

          .forgot-link:hover {
            text-decoration: underline;
          }

          button {
            width: 100%;
            padding: 15px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
          }

          button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
          }

          button:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }

          .alert {
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 20px;
            display: none;
          }

          .alert.error {
            background: #fee;
            color: #c33;
            border: 1px solid #fcc;
            display: block;
          }

          .alert.success {
            background: #efe;
            color: #3c3;
            border: 1px solid #cfc;
            display: block;
          }

          .security-badge {
            text-align: center;
            margin-top: 20px;
            color: #fff;
            opacity: 0.8;
            font-size: 13px;
          }

          .security-badge i {
            margin-right: 5px;
          }

          .loading {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid #f3f3f3;
            border-top: 3px solid #667eea;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-right: 10px;
            vertical-align: middle;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          .two-factor-section {
            display: none;
          }
        </style>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
      </head>
      <body>
        <div class="container">
          <div class="card">
            <div class="logo">
              <i class="fas fa-shield-alt" style="font-size: 48px; color: #667eea; margin-bottom: 15px;"></i>
              <h1>Admin Portal</h1>
              <p>Suicide Note - Secure Access</p>
            </div>

            <div id="alert" class="alert"></div>

            <form id="loginForm">
              <div class="form-group">
                <label><i class="fas fa-envelope"></i> Email Address</label>
                <div class="input-wrapper">
                  <i class="fas fa-envelope"></i>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="admin@example.com" 
                    required 
                    autocomplete="email"
                  >
                </div>
              </div>

              <div class="form-group">
                <label><i class="fas fa-lock"></i> Password</label>
                <div class="input-wrapper">
                  <i class="fas fa-lock"></i>
                  <input 
                    type="password" 
                    id="password" 
                    placeholder="Enter your password" 
                    required 
                    autocomplete="current-password"
                  >
                  <span class="password-toggle" onclick="togglePassword()">
                    <i class="fas fa-eye" id="toggleIcon"></i>
                  </span>
                </div>
              </div>

              <div class="remember-forgot">
                <label class="remember">
                  <input type="checkbox" id="remember"> Remember me
                </label>
                <a href="#" class="forgot-link" onclick="forgotPassword(event)">Forgot Password?</a>
              </div>

              <button type="submit" id="submitBtn">
                <span id="btnText">Sign In</span>
                <span id="btnLoader" style="display: none;" class="loading"></span>
              </button>
            </form>

            <div class="security-badge">
              <i class="fas fa-lock"></i> 256-bit SSL Encrypted
            </div>
          </div>
        </div>

        <script>
          function togglePassword() {
            const password = document.getElementById('password');
            const icon = document.getElementById('toggleIcon');
            
            if (password.type === 'password') {
              password.type = 'text';
              icon.classList.remove('fa-eye');
              icon.classList.add('fa-eye-slash');
            } else {
              password.type = 'password';
              icon.classList.remove('fa-eye-slash');
              icon.classList.add('fa-eye');
            }
          }

          async function forgotPassword(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            
            if (!email) {
              showAlert('Please enter your email address', 'error');
              return;
            }

            try {
              const response = await fetch('/api/v1/admin/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
              });

              const data = await response.json();
              
              if (data.success) {
                showAlert('Password reset link sent to your email', 'success');
              } else {
                showAlert(data.error || 'Failed to send reset link', 'error');
              }
            } catch (error) {
              showAlert('Network error. Please try again.', 'error');
            }
          }

          function showAlert(message, type) {
            const alert = document.getElementById('alert');
            alert.className = 'alert ' + type;
            alert.textContent = message;
            
            setTimeout(() => {
              alert.className = 'alert';
            }, 5000);
          }

          document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;
            
            const btnText = document.getElementById('btnText');
            const btnLoader = document.getElementById('btnLoader');
            const submitBtn = document.getElementById('submitBtn');
            
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline-block';
            submitBtn.disabled = true;

            try {
              const response = await fetch('/api/v1/admin/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, remember }),
                credentials: 'include'
              });

              const data = await response.json();
              
              if (data.success) {
                showAlert('Login successful! Redirecting...', 'success');
                
                // Store token in sessionStorage as backup
                if (data.token) {
                  sessionStorage.setItem('admin_token', data.token);
                  console.log('Token stored in sessionStorage');
                }
                
                // Small delay to ensure cookies are set
                setTimeout(() => {
                  window.location.href = data.redirect || '/admin/dashboard';
                }, 500);
              } else {
                showAlert(data.error || 'Invalid credentials', 'error');
              }
            } catch (error) {
              console.error('Login error:', error);
              showAlert('Network error. Please try again.', 'error');
            } finally {
              btnText.style.display = 'inline';
              btnLoader.style.display = 'none';
              submitBtn.disabled = false;
            }
          });

          // Check for error parameters
          const urlParams = new URLSearchParams(window.location.search);
          if (urlParams.get('error') === 'session_expired') {
            showAlert('Your session has expired. Please login again.', 'error');
          } else if (urlParams.get('error') === 'no_token') {
            showAlert('Please login to access the admin area.', 'error');
          } else if (urlParams.get('error') === 'auth_required') {
            showAlert('Authentication required. Please login.', 'error');
          }
        </script>
      </body>
      </html>
    `;
    
    res.send(html);
  },

  /**
   * Admin Sign In API
   */
  async signIn(req, res) {
    try {
      const { email, password, remember } = req.body;

      // Validation
      if (!email || !password) {
        return res.status(400).json({ 
          success: false, 
          error: 'Email and password are required' 
        });
      }

      // Find admin
      const admin = await Admin.findOne({ email: email.toLowerCase() });
      
      if (!admin) {
        winston.warn(`Failed login attempt for non-existent admin: ${email}`);
        return res.status(401).json({ 
          success: false, 
          error: 'Invalid credentials' 
        });
      }

      // Check if admin is active
      if (!admin.isActive) {
        return res.status(401).json({ 
          success: false, 
          error: 'Account is deactivated. Contact super admin.' 
        });
      }

      // Verify password
      const isValid = await admin.comparePassword(password);
      
      if (!isValid) {
        winston.warn(`Failed login attempt for admin: ${email}`);
        return res.status(401).json({ 
          success: false, 
          error: 'Invalid credentials' 
        });
      }

      // Log login
      admin.logLogin(req.ip, req.headers['user-agent']);
      await admin.save();

      // Generate tokens
      const token = admin.generateAuthToken();
      const refreshToken = admin.generateRefreshToken();

      // Set cookies with explicit options
      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        domain: process.env.NODE_ENV === 'production' ? '.onrender.com' : undefined,
        maxAge: remember ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000
      };

      // Set cookies
      res.cookie('admin_token', token, cookieOptions);
      res.cookie('admin_refresh_token', refreshToken, cookieOptions);

      winston.info(`Admin logged in: ${admin.email}`);

      // Return success with token in response body as backup
      return res.status(200).json({
        success: true,
        message: 'Login successful',
        redirect: '/admin/dashboard',
        token: token,
        data: {
          admin: {
            id: admin._id,
            email: admin.email,
            name: admin.name,
            role: admin.role,
            permissions: admin.permissions
          }
        }
      });

    } catch (error) {
      winston.error('Admin sign in error:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Authentication failed',
        details: error.message 
      });
    }
  },

  /**
   * Admin Sign Out
   */
  async signOut(req, res) {
    try {
      // Clear cookies with same options
      const cookieOptions = {
        path: '/',
        domain: process.env.NODE_ENV === 'production' ? '.onrender.com' : undefined,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
      };
      
      res.clearCookie('admin_token', cookieOptions);
      res.clearCookie('admin_refresh_token', cookieOptions);
      
      return res.status(200).json({
        success: true,
        message: 'Signed out successfully'
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to sign out' 
      });
    }
  },

  /**
   * Get current admin profile
   */
  async getProfile(req, res) {
    try {
      const admin = await Admin.findById(req.admin._id)
        .select('-password -twoFactorSecret -loginHistory');
      
      return res.status(200).json({
        success: true,
        data: admin
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch profile' 
      });
    }
  },

  /**
   * Update admin profile
   */
  async updateProfile(req, res) {
    try {
      const { name, email } = req.body;
      
      const admin = await Admin.findById(req.admin._id);
      
      if (name) admin.name = name;
      if (email) admin.email = email;
      
      await admin.save();
      
      return res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        data: {
          id: admin._id,
          email: admin.email,
          name: admin.name,
          role: admin.role
        }
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to update profile' 
      });
    }
  },

  /**
   * Change password
   */
  async changePassword(req, res) {
    try {
      const { currentPassword, newPassword } = req.body;

      const admin = await Admin.findById(req.admin._id);
      
      // Verify current password
      const isValid = await admin.comparePassword(currentPassword);
      
      if (!isValid) {
        return res.status(401).json({ 
          success: false, 
          error: 'Current password is incorrect' 
        });
      }

      // Update password
      admin.password = newPassword;
      await admin.save();

      // Send email notification
      await emailService.sendPasswordChangedEmail(admin.email);

      return res.status(200).json({
        success: true,
        message: 'Password changed successfully'
      });

    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to change password' 
      });
    }
  },

  /**
   * Setup 2FA
   */
  async setup2FA(req, res) {
    try {
      const secret = speakeasy.generateSecret({
        name: `Suicide Note Admin (${req.admin.email})`
      });

      // Save secret temporarily
      req.session.twoFactorSecret = secret.base32;

      // Generate QR code
      const qrCode = await qrcode.toDataURL(secret.otpauth_url);

      return res.status(200).json({
        success: true,
        data: {
          secret: secret.base32,
          qrCode
        }
      });

    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to setup 2FA' 
      });
    }
  },

  /**
   * Enable 2FA
   */
  async enable2FA(req, res) {
    try {
      const { token } = req.body;
      const secret = req.session.twoFactorSecret;

      if (!secret) {
        return res.status(400).json({ 
          success: false, 
          error: '2FA setup not initiated' 
        });
      }

      const verified = speakeasy.totp.verify({
        secret,
        encoding: 'base32',
        token
      });

      if (!verified) {
        return res.status(400).json({ 
          success: false, 
          error: 'Invalid verification code' 
        });
      }

      const admin = await Admin.findById(req.admin._id);
      admin.twoFactorEnabled = true;
      admin.twoFactorSecret = secret;
      await admin.save();

      delete req.session.twoFactorSecret;

      return res.status(200).json({
        success: true,
        message: '2FA enabled successfully'
      });

    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to enable 2FA' 
      });
    }
  },

  /**
   * Disable 2FA
   */
  async disable2FA(req, res) {
    try {
      const admin = await Admin.findById(req.admin._id);
      
      admin.twoFactorEnabled = false;
      admin.twoFactorSecret = null;
      await admin.save();

      return res.status(200).json({
        success: true,
        message: '2FA disabled successfully'
      });

    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to disable 2FA' 
      });
    }
  },

  /**
   * Refresh token
   */
  async refreshToken(req, res) {
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

      const admin = await Admin.findById(decoded.id);
      
      if (!admin || !admin.isActive) {
        return res.status(401).json({ 
          success: false, 
          error: 'Invalid refresh token' 
        });
      }

      const newToken = admin.generateAuthToken();
      
      // Set new token cookie
      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        domain: process.env.NODE_ENV === 'production' ? '.onrender.com' : undefined,
        maxAge: 24 * 60 * 60 * 1000
      };

      res.cookie('admin_token', newToken, cookieOptions);

      return res.status(200).json({
        success: true,
        message: 'Token refreshed successfully',
        token: newToken
      });

    } catch (error) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid refresh token' 
      });
    }
  },

  /**
   * Forgot password
   */
  async forgotPassword(req, res) {
    try {
      const { email } = req.body;

      const admin = await Admin.findOne({ email: email.toLowerCase() });
      
      if (!admin) {
        // Don't reveal if email exists
        return res.status(200).json({ 
          success: true, 
          message: 'If the email exists, a reset link will be sent' 
        });
      }

      // Generate reset token
      const resetToken = crypto.randomBytes(32).toString('hex');
      
      // Store hashed token
      admin.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
      
      admin.resetPasswordExpires = Date.now() + 3600000; // 1 hour
      
      await admin.save();

      // Send reset email
      const resetUrl = `${process.env.ADMIN_URL || process.env.FRONTEND_URL || 'https://suicidenote.onrender.com'}/reset-password?token=${resetToken}`;
      
      await emailService.sendPasswordResetEmail(admin.email, resetUrl);

      return res.status(200).json({
        success: true,
        message: 'Password reset link sent to your email'
      });

    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to process request' 
      });
    }
  },

  /**
   * Reset password
   */
  async resetPassword(req, res) {
    try {
      const { token, password } = req.body;

      // Hash token
      const hashedToken = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');

      const admin = await Admin.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { $gt: Date.now() }
      });

      if (!admin) {
        return res.status(400).json({ 
          success: false, 
          error: 'Invalid or expired token' 
        });
      }

      // Update password
      admin.password = password;
      admin.resetPasswordToken = undefined;
      admin.resetPasswordExpires = undefined;
      
      await admin.save();

      return res.status(200).json({
        success: true,
        message: 'Password reset successfully'
      });

    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to reset password' 
      });
    }
  },

  /**
   * Get login history
   */
  async getLoginHistory(req, res) {
    try {
      const admin = await Admin.findById(req.admin._id)
        .select('loginHistory');
      
      return res.status(200).json({
        success: true,
        data: admin.loginHistory
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch login history' 
      });
    }
  },

  /**
   * Debug cookies (for troubleshooting)
   */
  async debugCookies(req, res) {
    console.log('🍪 Debug cookies - Cookies:', req.cookies);
    console.log('🍪 Debug cookies - Headers:', req.headers['cookie']);
    
    return res.status(200).json({
      success: true,
      cookies: req.cookies,
      cookieHeader: req.headers['cookie'],
      hasToken: !!req.cookies.admin_token,
      hasRefreshToken: !!req.cookies.admin_refresh_token
    });
  }
};

module.exports = adminAuthController;