const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
  },
  password: {
    type: String,
    minlength: [6, 'Password must be at least 6 characters'],
    select: false,
  },
  phone: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    enum: ['user', 'affiliate', 'admin'],
    default: 'user',
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  verificationTokenExpires: Date,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  profilePicture: String,
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot exceed 500 characters'],
  },
  socialLinks: {
    twitter: String,
    facebook: String,
    instagram: String,
    linkedin: String,
  },
  readingProgress: {
    lastPage: Number,
    lastChapter: String,
    lastReadAt: Date,
  },
  notifications: {
    emailNotifications: {
      type: Boolean,
      default: true,
    },
    affiliateNotifications: {
      type: Boolean,
      default: true,
    },
  },
  settings: {
    theme: {
      type: String,
      enum: ['light', 'dark', 'auto'],
      default: 'light',
    },
    fontSize: {
      type: Number,
      min: 12,
      max: 24,
      default: 16,
    },
  },
  affiliateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Affiliate',
  },
  purchases: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Purchase',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Indexes
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ role: 1 });
userSchema.index({ createdAt: -1 });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Update updatedAt timestamp
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  if (!this.password) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

// Generate JWT token
userSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    { id: this._id, email: this.email, role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

// Generate verification token
userSchema.methods.generateVerificationToken = function() {
  const verificationToken = jwt.sign(
    { id: this._id },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
  
  this.verificationToken = verificationToken;
  this.verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  
  return verificationToken;
};

// Generate password reset token
userSchema.methods.generatePasswordResetToken = function() {
  const resetToken = jwt.sign(
    { id: this._id },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  
  this.resetPasswordToken = resetToken;
  this.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 hour
  
  return resetToken;
};

// Check if user has purchased ebook
userSchema.methods.hasPurchased = function(ebookId) {
  return this.purchases.some(purchase => 
    purchase.ebook.toString() === ebookId.toString() && purchase.status === 'completed'
  );
};

// Get user's total purchases
userSchema.methods.getTotalPurchases = function() {
  return this.purchases.filter(p => p.status === 'completed').length;
};

// Get user's total spent
userSchema.methods.getTotalSpent = function() {
  return this.purchases
    .filter(p => p.status === 'completed')
    .reduce((total, purchase) => total + purchase.amount, 0);
};

const User = mongoose.model('User', userSchema);

module.exports = User;