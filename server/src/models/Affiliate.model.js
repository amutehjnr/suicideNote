const mongoose = require('mongoose');

const affiliateSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  affiliateCode: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  referralLink: {
    type: String,
    required: true
  },
  commissionRate: {
    type: Number,
    default: 0.5, // 50%
    min: 0,
    max: 1
  },
  
  // Earnings tracking
  totalEarnings: {
    type: Number,
    default: 0
  },
  pendingEarnings: {
    type: Number,
    default: 0
  },
  paidEarnings: {
    type: Number,
    default: 0
  },
  
  // Stats tracking
  clicks: {
    type: Number,
    default: 0
  },
  totalReferrals: {
    type: Number,
    default: 0
  },
  successfulReferrals: {
    type: Number,
    default: 0
  },
  conversionRate: {
    type: Number,
    default: 0
  },
  
  // Referrals list
  referrals: [{
    purchaseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Purchase'
    },
    amount: Number,
    commission: Number,
    status: {
      type: String,
      enum: ['pending', 'completed', 'cancelled'],
      default: 'pending'
    },
    date: Date
  }],
  
  // Sales list
  sales: [{
    purchaseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Purchase'
    },
    amount: Number,
    commission: Number,
    date: Date,
    status: {
      type: String,
      enum: ['pending', 'paid', 'cancelled'],
      default: 'pending'
    }
  }],
  
  // Campaigns
  campaigns: [{
    name: String,
    description: String,
    link: String,
    clicks: { type: Number, default: 0 },
    conversions: { type: Number, default: 0 },
    earnings: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
  }],
  
  // Bank details
  bankDetails: {
    accountNumber: String,
    accountName: String,
    bankCode: String,
    bankName: String
  },
  paystackRecipientCode: String,
  
  // Settings
  paymentThreshold: {
    type: Number,
    default: 5000 // ₦5,000 minimum payout
  },
  notifications: {
    onSale: { type: Boolean, default: true },
    onPayout: { type: Boolean, default: true },
    monthlyReport: { type: Boolean, default: true }
  },
  settings: {
    autoWithdraw: { type: Boolean, default: false },
    withdrawThreshold: { type: Number, default: 5000 },
    payoutMethod: { 
      type: String, 
      enum: ['paystack', 'bank', 'wallet'],
      default: 'paystack'
    }
  },
  
  // Status
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  
  // Performance data
  performance: {
    daily: mongoose.Schema.Types.Mixed,
    weekly: mongoose.Schema.Types.Mixed,
    monthly: mongoose.Schema.Types.Mixed,
    last30Days: {
      clicks: { type: Number, default: 0 },
      referrals: { type: Number, default: 0 },
      earnings: { type: Number, default: 0 }
    }
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Virtual for formatted earnings
affiliateSchema.virtual('formattedTotalEarnings').get(function() {
  const formatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  return formatter.format(this.totalEarnings / 100).replace('NGN', '₦');
});

affiliateSchema.virtual('formattedPendingEarnings').get(function() {
  const formatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  return formatter.format(this.pendingEarnings / 100).replace('NGN', '₦');
});

affiliateSchema.virtual('formattedPaidEarnings').get(function() {
  const formatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  return formatter.format(this.paidEarnings / 100).replace('NGN', '₦');
});

// Methods
affiliateSchema.methods.addClick = async function(campaignName) {
  this.clicks = (this.clicks || 0) + 1;
  
  if (campaignName) {
    const campaign = this.campaigns.find(c => c.name === campaignName);
    if (campaign) {
      campaign.clicks = (campaign.clicks || 0) + 1;
    }
  }
  
  await this.save();
  return this;
};

affiliateSchema.methods.addSuccessfulReferral = async function(amount, commission, campaignName) {
  // Initialize if undefined
  if (typeof this.successfulReferrals !== 'number') this.successfulReferrals = 0;
  if (typeof this.totalReferrals !== 'number') this.totalReferrals = 0;
  if (typeof this.totalEarnings !== 'number') this.totalEarnings = 0;
  if (typeof this.pendingEarnings !== 'number') this.pendingEarnings = 0;
  
  this.successfulReferrals += 1;
  this.totalReferrals += 1;
  this.totalEarnings += commission;
  this.pendingEarnings += commission;
  
  if (this.clicks > 0) {
    this.conversionRate = (this.successfulReferrals / this.clicks) * 100;
  }
  
  if (campaignName) {
    const campaign = this.campaigns.find(c => c.name === campaignName);
    if (campaign) {
      campaign.conversions = (campaign.conversions || 0) + 1;
      campaign.earnings = (campaign.earnings || 0) + commission;
    }
  }
  
  await this.save();
  return this;
};

affiliateSchema.methods.generateCampaignLink = function(campaignName, medium, source) {
  const baseUrl = process.env.CLIENT_URL || 'https://suicidenote.onrender.com';
  let link = `${baseUrl}/?ref=${this.affiliateCode}`;
  
  if (campaignName) {
    link += `&campaign=${encodeURIComponent(campaignName)}`;
  }
  if (medium) {
    link += `&medium=${encodeURIComponent(medium)}`;
  }
  if (source) {
    link += `&source=${encodeURIComponent(source)}`;
  }
  
  return link;
};

// Pre-save middleware
affiliateSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Affiliate', affiliateSchema);