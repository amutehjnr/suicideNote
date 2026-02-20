const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
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
  amount: {
    type: Number,
    required: true,
    min: [0, 'Amount cannot be negative'],
  },
  currency: {
    type: String,
    required: true,
    enum: ['NGN', 'USD'],
    default: 'NGN',
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['paystack', 'stripe', 'bank_transfer', 'wallet'],
    default: 'paystack',
  },
  transactionReference: {
    type: String,
    unique: true,
    sparse: true,
    default: undefined,
  },
  paystackReference: {
    type: String,
    sparse: true,
  },
  stripePaymentIntentId: {
    type: String,
    sparse: true,
  },
  stripeSessionId: {
    type: String,
    sparse: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'processing', 'completed', 'failed', 'refunded', 'cancelled'],
    default: 'pending',
  },
  affiliate: {
    affiliateCode: String,
    commissionAmount: Number,
    commissionRate: Number,
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: Date,
  },
  paymentDetails: {
    authorizationCode: String,
    cardType: String,
    last4: String,
    expMonth: String,
    expYear: String,
    bank: String,
    channel: String,
    paidAt: Date,
  },
  metadata: {
    ipAddress: String,
    userAgent: String,
    deviceType: String,
    guestEmail: String,
    guestName: String,
    autoCreated: Boolean,
    campaignName: String,
  },
  accessCode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AccessCode',
  },
  notes: String,
  completedAt: Date,
  refundedAt: Date,
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
purchaseSchema.index({ user: 1 });
purchaseSchema.index({ ebook: 1 });
purchaseSchema.index({ transactionReference: 1 }, { unique: true, sparse: true });
purchaseSchema.index({ paystackReference: 1 }, { sparse: true });
purchaseSchema.index({ stripeSessionId: 1 }, { sparse: true });
purchaseSchema.index({ status: 1 });
purchaseSchema.index({ createdAt: -1 });
purchaseSchema.index({ 'affiliate.affiliateCode': 1 });
purchaseSchema.index({ 'affiliate.isPaid': 1 });
purchaseSchema.index({ currency: 1 });

// Pre-save hook to update timestamps
purchaseSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  
  if (this.status === 'completed' && !this.completedAt) {
    this.completedAt = Date.now();
  }
  
  if (this.status === 'refunded' && !this.refundedAt) {
    this.refundedAt = Date.now();
  }
  
  next();
});

// Virtual for formatted amount
purchaseSchema.virtual('formattedAmount').get(function() {
  const formatter = new Intl.NumberFormat(this.currency === 'NGN' ? 'en-NG' : 'en-US', {
    style: 'currency',
    currency: this.currency,
  });
  return formatter.format(this.amount / (this.currency === 'NGN' ? 100 : 100));
});

// Virtual for formatted commission amount
purchaseSchema.virtual('formattedCommission').get(function() {
  if (!this.affiliate?.commissionAmount) return null;
  
  const formatter = new Intl.NumberFormat(this.currency === 'NGN' ? 'en-NG' : 'en-US', {
    style: 'currency',
    currency: this.currency,
  });
  return formatter.format(this.affiliate.commissionAmount / 100);
});

// Check if purchase is successful
purchaseSchema.methods.isSuccessful = function() {
  return this.status === 'completed';
};

// Check if affiliate commission is paid
purchaseSchema.methods.isCommissionPaid = function() {
  return this.affiliate?.isPaid || false;
};

// Mark commission as paid
purchaseSchema.methods.markCommissionAsPaid = async function() {
  if (this.affiliate) {
    this.affiliate.isPaid = true;
    this.affiliate.paidAt = Date.now();
    await this.save();
  }
};

// Get purchase summary
purchaseSchema.methods.getSummary = function() {
  return {
    id: this._id,
    ebook: this.ebook,
    amount: this.formattedAmount,
    currency: this.currency,
    paymentMethod: this.paymentMethod,
    status: this.status,
    transactionReference: this.transactionReference,
    createdAt: this.createdAt,
    completedAt: this.completedAt,
    hasAffiliate: !!this.affiliate,
    commissionAmount: this.formattedCommission,
    isCommissionPaid: this.isCommissionPaid(),
  };
};

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;