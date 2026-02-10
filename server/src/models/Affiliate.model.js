const mongoose = require('mongoose');

const affiliateSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  affiliateCode: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
  customLink: {
    type: String,
    unique: true,
    sparse: true,
  },
  referralLink: {
    type: String,
    required: true,
  },
  totalEarnings: {
    type: Number,
    default: 0,
    min: 0,
  },
  pendingEarnings: {
    type: Number,
    default: 0,
    min: 0,
  },
  paidEarnings: {
    type: Number,
    default: 0,
    min: 0,
  },
  totalReferrals: {
    type: Number,
    default: 0,
  },
  successfulReferrals: {
    type: Number,
    default: 0,
  },
  conversionRate: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  commissionRate: {
    type: Number,
    default: 0.5, // 50% default
    min: 0,
    max: 1,
  },
  paystackRecipientCode: {
    type: String,
    sparse: true,
  },
  bankDetails: {
    accountNumber: String,
    accountName: String,
    bankCode: String,
    bankName: String,
  },
  paymentThreshold: {
    type: Number,
    default: 5000, // Minimum ₦5000 to request payout
    min: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationData: {
    idType: String,
    idNumber: String,
    idImage: String,
    addressProof: String,
  },
  performance: {
    last30Days: {
      referrals: { type: Number, default: 0 },
      earnings: { type: Number, default: 0 },
      clicks: { type: Number, default: 0 },
    },
    last90Days: {
      referrals: { type: Number, default: 0 },
      earnings: { type: Number, default: 0 },
      clicks: { type: Number, default: 0 },
    },
    allTime: {
      referrals: { type: Number, default: 0 },
      earnings: { type: Number, default: 0 },
      clicks: { type: Number, default: 0 },
    },
  },
  campaigns: [{
    name: String,
    link: String,
    clicks: { type: Number, default: 0 },
    conversions: { type: Number, default: 0 },
    earnings: { type: Number, default: 0 },
    createdAt: Date,
  }],
  notifications: {
    onSale: { type: Boolean, default: true },
    onPayout: { type: Boolean, default: true },
    monthlyReport: { type: Boolean, default: true },
  },
  settings: {
    autoWithdraw: { type: Boolean, default: false },
    withdrawThreshold: { type: Number, default: 10000 },
    payoutMethod: { 
      type: String, 
      enum: ['paystack', 'bank', 'wallet'],
      default: 'paystack',
    },
  },
  statsUpdatedAt: {
    type: Date,
    default: Date.now,
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
affiliateSchema.index({ user: 1 }, { unique: true });
affiliateSchema.index({ affiliateCode: 1 }, { unique: true });
affiliateSchema.index({ totalEarnings: -1 });
affiliateSchema.index({ successfulReferrals: -1 });
affiliateSchema.index({ isActive: 1 });
affiliateSchema.index({ createdAt: -1 });

// Pre-save hook to update conversion rate
affiliateSchema.pre('save', function(next) {
  if (this.totalReferrals > 0) {
    this.conversionRate = (this.successfulReferrals / this.totalReferrals) * 100;
  }
  
  this.updatedAt = Date.now();
  next();
});

// Virtual for formatted earnings
affiliateSchema.virtual('formattedTotalEarnings').get(function() {
  const formatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  });
  return formatter.format(this.totalEarnings / 100);
});

affiliateSchema.virtual('formattedPendingEarnings').get(function() {
  const formatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  });
  return formatter.format(this.pendingEarnings / 100);
});

affiliateSchema.virtual('formattedPaidEarnings').get(function() {
  const formatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  });
  return formatter.format(this.paidEarnings / 100);
});

// Method to add referral click
affiliateSchema.methods.addClick = async function(campaignName = null) {
  this.clicks += 1;
  this.totalReferrals += 1;
  
  if (campaignName) {
    const campaign = this.campaigns.find(c => c.name === campaignName);
    if (campaign) {
      campaign.clicks += 1;
    } else {
      this.campaigns.push({
        name: campaignName,
        link: `${this.referralLink}?campaign=${encodeURIComponent(campaignName)}`,
        clicks: 1,
        conversions: 0,
        earnings: 0,
        createdAt: new Date(),
      });
    }
  }
  
  await this.save();
};

// Method to add successful referral
affiliateSchema.methods.addSuccessfulReferral = async function(amount, commission, campaignName = null) {
  this.successfulReferrals += 1;
  this.totalEarnings += commission;
  this.pendingEarnings += commission;
  
  if (campaignName) {
    const campaign = this.campaigns.find(c => c.name === campaignName);
    if (campaign) {
      campaign.conversions += 1;
      campaign.earnings += commission;
    }
  }
  
  // Update performance stats
  const now = new Date();
  const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
  const ninetyDaysAgo = new Date(now.setDate(now.getDate() - 90));
  
  if (this.createdAt >= thirtyDaysAgo) {
    this.performance.last30Days.referrals += 1;
    this.performance.last30Days.earnings += commission;
  }
  
  if (this.createdAt >= ninetyDaysAgo) {
    this.performance.last90Days.referrals += 1;
    this.performance.last90Days.earnings += commission;
  }
  
  this.performance.allTime.referrals += 1;
  this.performance.allTime.earnings += commission;
  
  await this.save();
};

// Method to process payout
affiliateSchema.methods.processPayout = async function(payoutService) {
  if (this.pendingEarnings < this.paymentThreshold) {
    throw new Error(`Minimum payout threshold of ₦${this.paymentThreshold/100} not reached`);
  }
  
  if (!this.bankDetails.accountNumber || !this.bankDetails.bankCode) {
    throw new Error('Bank details not set up');
  }
  
  const payoutAmount = this.pendingEarnings;
  
  // Initiate payout via Paystack
  const payoutResult = await payoutService.initiateTransfer(
    this.paystackRecipientCode,
    payoutAmount,
    `Affiliate commission payout for ${this.affiliateCode}`
  );
  
  if (payoutResult.success) {
    this.pendingEarnings = 0;
    this.paidEarnings += payoutAmount;
    await this.save();
    
    return {
      success: true,
      amount: payoutAmount,
      reference: payoutResult.data.reference,
    };
  }
  
  throw new Error(payoutResult.error);
};

// Method to get performance metrics
affiliateSchema.methods.getPerformanceMetrics = function() {
  return {
    totalClicks: this.clicks,
    totalReferrals: this.totalReferrals,
    successfulReferrals: this.successfulReferrals,
    conversionRate: this.conversionRate,
    totalEarnings: this.formattedTotalEarnings,
    pendingEarnings: this.formattedPendingEarnings,
    paidEarnings: this.formattedPaidEarnings,
    performance: this.performance,
    campaigns: this.campaigns,
  };
};

// Method to generate custom campaign link
affiliateSchema.methods.generateCampaignLink = function(campaignName, medium = null, source = null) {
  let link = `${this.referralLink}?campaign=${encodeURIComponent(campaignName)}`;
  
  if (medium) link += `&medium=${encodeURIComponent(medium)}`;
  if (source) link += `&source=${encodeURIComponent(source)}`;
  
  return link;
};

const Affiliate = mongoose.model('Affiliate', affiliateSchema);

module.exports = Affiliate;