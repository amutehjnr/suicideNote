const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'superadmin'],
    default: 'admin'
  },
  permissions: [{
    type: String,
    enum: [
      'view_dashboard',
      'manage_transactions',
      'manage_access_codes',
      'manage_users',
      'manage_affiliates',
      'manage_admins',
      'send_free_access',
      'process_refunds',
      'export_data'
    ]
  }],
  lastLogin: {
    type: Date
  },
  lastLoginIp: String,
  loginHistory: [{
    ip: String,
    userAgent: String,
    timestamp: Date
  }],
  twoFactorEnabled: {
    type: Boolean,
    default: false
  },
  twoFactorSecret: String,
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
AdminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Update timestamp
AdminSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Compare password method
AdminSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Generate JWT token
AdminSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    { 
      id: this._id, 
      email: this.email, 
      role: this.role,
      type: 'admin' 
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

// Generate refresh token
AdminSchema.methods.generateRefreshToken = function() {
  return jwt.sign(
    { id: this._id, type: 'admin_refresh' },
    process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Check permission
AdminSchema.methods.hasPermission = function(permission) {
  if (this.role === 'superadmin') return true;
  return this.permissions.includes(permission);
};

// Log login
AdminSchema.methods.logLogin = function(ip, userAgent) {
  this.lastLogin = new Date();
  this.lastLoginIp = ip;
  this.loginHistory.push({ ip, userAgent, timestamp: new Date() });
  
  // Keep only last 50 logins
  if (this.loginHistory.length > 50) {
    this.loginHistory = this.loginHistory.slice(-50);
  }
};

module.exports = mongoose.model('Admin', AdminSchema);