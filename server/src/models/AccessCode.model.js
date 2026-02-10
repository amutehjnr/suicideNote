const mongoose = require('mongoose');
const crypto = require('crypto');

const accessCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  ebook: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ebook',
    required: true,
  },
  purchase: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Purchase',
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  accessCount: {
    type: Number,
    default: 0,
  },
  lastAccessedAt: Date,
  expiresAt: {
    type: Date,
    required: true,
  },
  metadata: {
    device: String,
    browser: String,
    ipAddress: String,
  },
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
accessCodeSchema.index({ code: 1 }, { unique: true });
accessCodeSchema.index({ user: 1 });
accessCodeSchema.index({ ebook: 1 });
accessCodeSchema.index({ purchase: 1 });
accessCodeSchema.index({ expiresAt: 1 });
accessCodeSchema.index({ isActive: 1 });

// Pre-save hook to update timestamp
accessCodeSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Static method to generate unique access code
accessCodeSchema.statics.generateCode = function() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Removed confusing characters
  let code = 'SN-';
  
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return code;
};

// Method to check if code is valid
accessCodeSchema.methods.isValid = function() {
  return this.isActive && new Date() < this.expiresAt;
};

// Method to increment access count
accessCodeSchema.methods.incrementAccess = async function(metadata = {}) {
  this.accessCount += 1;
  this.lastAccessedAt = new Date();
  
  if (metadata.device) this.metadata.device = metadata.device;
  if (metadata.browser) this.metadata.browser = metadata.browser;
  if (metadata.ipAddress) this.metadata.ipAddress = metadata.ipAddress;
  
  await this.save();
};

// Method to revoke access
accessCodeSchema.methods.revoke = async function() {
  this.isActive = false;
  await this.save();
};

// Method to extend expiry
accessCodeSchema.methods.extendExpiry = async function(days = 365) {
  const newExpiryDate = new Date();
  newExpiryDate.setDate(newExpiryDate.getDate() + days);
  this.expiresAt = newExpiryDate;
  await this.save();
};

// Method to get code info
accessCodeSchema.methods.getInfo = function() {
  return {
    code: this.code,
    ebook: this.ebook,
    isValid: this.isValid(),
    accessCount: this.accessCount,
    lastAccessedAt: this.lastAccessedAt,
    expiresAt: this.expiresAt,
    createdAt: this.createdAt,
  };
};

const AccessCode = mongoose.model('AccessCode', accessCodeSchema);

module.exports = AccessCode;