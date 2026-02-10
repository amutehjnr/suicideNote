const User = require('../models/User.model');
const Affiliate = require('../models/Affiliate.model');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const winston = require('winston');
const emailService = require('./email.service');
const { generateAffiliateLink } = require('../utils/generateAffiliateLink');

class AuthService {
  async register(userData, ipAddress = null, userAgent = null) {
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email: userData.email });
      
      if (existingUser) {
        // If user exists but hasn't verified email, resend verification
        if (!existingUser.isVerified) {
          await this.sendVerificationEmail(existingUser);
          return {
            success: true,
            message: 'Verification email resent. Please check your email.',
            user: existingUser,
            requiresVerification: true,
          };
        }
        
        return {
          success: false,
          error: 'User already exists',
        };
      }

      // Create new user
      const user = await User.create({
        ...userData,
        metadata: {
          ipAddress,
          userAgent,
        },
      });

      // Generate verification token
      const verificationToken = user.generateVerificationToken();
      await user.save();

      // Send verification email
      await this.sendVerificationEmail(user, verificationToken);

      // Generate auth token
      const token = user.generateAuthToken();

      winston.info(`New user registered: ${user.email}`);

      return {
        success: true,
        token,
        user: this.sanitizeUser(user),
        requiresVerification: true,
      };
    } catch (error) {
      winston.error('Registration error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async login(email, password, ipAddress = null, userAgent = null) {
    try {
      // Find user with password
      const user = await User.findOne({ email }).select('+password');
      
      if (!user) {
        return {
          success: false,
          error: 'Invalid credentials',
        };
      }

      // Check if user is verified
      if (!user.isVerified) {
        const verificationToken = user.generateVerificationToken();
        await user.save();
        await this.sendVerificationEmail(user, verificationToken);
        
        return {
          success: false,
          error: 'Please verify your email address',
          requiresVerification: true,
        };
      }

      // Check password
      const isPasswordValid = await user.comparePassword(password);
      
      if (!isPasswordValid) {
        return {
          success: false,
          error: 'Invalid credentials',
        };
      }

      // Update last login info
      user.lastLoginAt = new Date();
      user.lastLoginIp = ipAddress;
      await user.save();

      // Generate auth token
      const token = user.generateAuthToken();

      winston.info(`User logged in: ${user.email}`);

      return {
        success: true,
        token,
        user: this.sanitizeUser(user),
      };
    } catch (error) {
      winston.error('Login error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async verifyEmail(token) {
    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Find user with verification token
      const user = await User.findOne({
        _id: decoded.id,
        verificationToken: token,
        verificationTokenExpires: { $gt: Date.now() },
      });

      if (!user) {
        return {
          success: false,
          error: 'Invalid or expired verification token',
        };
      }

      // Mark user as verified
      user.isVerified = true;
      user.verificationToken = undefined;
      user.verificationTokenExpires = undefined;
      await user.save();

      // Send welcome email
      await emailService.sendWelcomeEmail(user.email, user.name);

      winston.info(`Email verified: ${user.email}`);

      return {
        success: true,
        message: 'Email verified successfully',
        user: this.sanitizeUser(user),
      };
    } catch (error) {
      winston.error('Email verification error:', error);
      return {
        success: false,
        error: 'Invalid verification token',
      };
    }
  }

  async forgotPassword(email) {
    try {
      const user = await User.findOne({ email });
      
      if (!user) {
        // Don't reveal that user doesn't exist
        return {
          success: true,
          message: 'If an account exists with this email, you will receive a password reset link',
        };
      }

      // Generate password reset token
      const resetToken = user.generatePasswordResetToken();
      await user.save();

      // Send password reset email
      await emailService.sendPasswordResetEmail(user.email, resetToken);

      winston.info(`Password reset requested for: ${user.email}`);

      return {
        success: true,
        message: 'Password reset link sent to your email',
      };
    } catch (error) {
      winston.error('Forgot password error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async resetPassword(token, newPassword) {
    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Find user with reset token
      const user = await User.findOne({
        _id: decoded.id,
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      });

      if (!user) {
        return {
          success: false,
          error: 'Invalid or expired reset token',
        };
      }

      // Update password
      user.password = newPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();

      // Send password changed email
      await emailService.sendPasswordChangedEmail(user.email);

      winston.info(`Password reset for: ${user.email}`);

      return {
        success: true,
        message: 'Password reset successfully',
      };
    } catch (error) {
      winston.error('Reset password error:', error);
      return {
        success: false,
        error: 'Invalid reset token',
      };
    }
  }

  async becomeAffiliate(userId) {
    try {
      const user = await User.findById(userId);
      
      if (!user) {
        return {
          success: false,
          error: 'User not found',
        };
      }

      // Check if user is already an affiliate
      if (user.role === 'affiliate' && user.affiliateId) {
        const affiliate = await Affiliate.findById(user.affiliateId);
        return {
          success: true,
          message: 'Already an affiliate',
          affiliate,
        };
      }

      // Generate affiliate code
      const affiliateCode = this.generateAffiliateCode(user);
      
      // Generate referral link
      const referralLink = generateAffiliateLink(affiliateCode);

      // Create affiliate record
      const affiliate = await Affiliate.create({
        user: userId,
        affiliateCode,
        referralLink,
        commissionRate: parseFloat(process.env.AFFILIATE_COMMISSION_RATE) || 0.5,
      });

      // Update user role and affiliate ID
      user.role = 'affiliate';
      user.affiliateId = affiliate._id;
      await user.save();

      // Send affiliate welcome email
      await emailService.sendAffiliateWelcomeEmail(user.email, user.name, affiliate);

      winston.info(`User became affiliate: ${user.email}`);

      return {
        success: true,
        message: 'Affiliate account created successfully',
        affiliate,
      };
    } catch (error) {
      winston.error('Become affiliate error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async updateProfile(userId, updateData) {
    try {
      const user = await User.findById(userId);
      
      if (!user) {
        return {
          success: false,
          error: 'User not found',
        };
      }

      // Remove restricted fields
      delete updateData.password;
      delete updateData.email;
      delete updateData.role;
      delete updateData.isVerified;

      // Update user
      Object.assign(user, updateData);
      await user.save();

      return {
        success: true,
        message: 'Profile updated successfully',
        user: this.sanitizeUser(user),
      };
    } catch (error) {
      winston.error('Update profile error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async changePassword(userId, currentPassword, newPassword) {
    try {
      const user = await User.findById(userId).select('+password');
      
      if (!user) {
        return {
          success: false,
          error: 'User not found',
        };
      }

      // Verify current password
      const isPasswordValid = await user.comparePassword(currentPassword);
      
      if (!isPasswordValid) {
        return {
          success: false,
          error: 'Current password is incorrect',
        };
      }

      // Update password
      user.password = newPassword;
      await user.save();

      // Send password changed email
      await emailService.sendPasswordChangedEmail(user.email);

      winston.info(`Password changed for: ${user.email}`);

      return {
        success: true,
        message: 'Password changed successfully',
      };
    } catch (error) {
      winston.error('Change password error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async sendVerificationEmail(user, token = null) {
    const verificationToken = token || user.generateVerificationToken();
    await user.save();
    
    return emailService.sendVerificationEmail(user.email, verificationToken, user.name);
  }

  generateAffiliateCode(user) {
    // Generate unique affiliate code (e.g., JOHN1234)
    const namePart = user.name 
      ? user.name.substring(0, 4).toUpperCase().replace(/\s/g, '')
      : 'USER';
    
    const randomPart = Math.floor(1000 + Math.random() * 9000);
    
    return `${namePart}${randomPart}`;
  }

  sanitizeUser(user) {
    const userObject = user.toObject();
    
    // Remove sensitive fields
    delete userObject.password;
    delete userObject.verificationToken;
    delete userObject.verificationTokenExpires;
    delete userObject.resetPasswordToken;
    delete userObject.resetPasswordExpires;
    
    return userObject;
  }

  async validateToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      
      if (!user) {
        return {
          success: false,
          error: 'User not found',
        };
      }

      return {
        success: true,
        user: this.sanitizeUser(user),
      };
    } catch (error) {
      return {
        success: false,
        error: 'Invalid token',
      };
    }
  }
}

module.exports = new AuthService();