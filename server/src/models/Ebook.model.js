const mongoose = require('mongoose');

const ebookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    lowercase: true,
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  shortDescription: {
    type: String,
    maxlength: [200, 'Short description cannot exceed 200 characters'],
  },
  coverImage: {
    type: String,
    required: [true, 'Cover image is required'],
  },
  previewContent: {
    type: String,
    required: [true, 'Preview content is required'],
  },
  fullContent: {
    type: String,
    required: [true, 'Full content is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative'],
  },
  discountPrice: {
    type: Number,
    min: [0, 'Discount price cannot be negative'],
  },
  currency: {
    type: String,
    default: 'NGN',
    enum: ['NGN', 'USD', 'EUR', 'GBP'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['fiction', 'non-fiction', 'self-help', 'mental-health', 'biography'],
  },
  tags: [{
    type: String,
    trim: true,
  }],
  chapters: [{
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    pageCount: Number,
    estimatedReadingTime: Number, // in minutes
  }],
  totalPages: {
    type: Number,
    default: 0,
  },
  estimatedReadingTime: {
    type: Number,
    default: 0, // in minutes
  },
  language: {
    type: String,
    default: 'English',
  },
  isbn: {
    type: String,
    unique: true,
    sparse: true,
  },
  publisher: String,
  publishedDate: Date,
  ratings: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    count: {
      type: Number,
      default: 0,
    },
    distribution: {
      1: { type: Number, default: 0 },
      2: { type: Number, default: 0 },
      3: { type: Number, default: 0 },
      4: { type: Number, default: 0 },
      5: { type: Number, default: 0 },
    },
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: String,
    helpful: {
      type: Number,
      default: 0,
    },
    reported: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
  salesCount: {
    type: Number,
    default: 0,
  },
  affiliateCommissionRate: {
    type: Number,
    default: 0.5, // 50% default commission
    min: 0,
    max: 1,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  metadata: {
    keywords: [String],
    ogImage: String,
    twitterCard: String,
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
ebookSchema.index({ slug: 1 }, { unique: true });
ebookSchema.index({ isPublished: 1 });
ebookSchema.index({ category: 1 });
ebookSchema.index({ 'ratings.average': -1 });
ebookSchema.index({ salesCount: -1 });
ebookSchema.index({ createdAt: -1 });
ebookSchema.index({ isFeatured: 1 });

// Calculate total pages before saving
ebookSchema.pre('save', function(next) {
  if (this.chapters && this.chapters.length > 0) {
    this.totalPages = this.chapters.reduce((total, chapter) => 
      total + (chapter.pageCount || 0), 0);
    
    // Estimate reading time (assuming 200 words per minute)
    const totalWords = this.fullContent.split(/\s+/).length;
    this.estimatedReadingTime = Math.ceil(totalWords / 200);
  }
  next();
});

// Update average rating
ebookSchema.methods.updateRating = function(newRating, oldRating = null) {
  const ratings = this.ratings;
  
  if (oldRating) {
    // Update existing rating
    ratings.distribution[oldRating]--;
  }
  
  // Add new rating
  ratings.distribution[newRating]++;
  
  // Calculate new average
  let totalScore = 0;
  let totalRatings = 0;
  
  for (let i = 1; i <= 5; i++) {
    totalScore += i * ratings.distribution[i];
    totalRatings += ratings.distribution[i];
  }
  
  ratings.count = totalRatings;
  ratings.average = totalRatings > 0 ? totalScore / totalRatings : 0;
  
  return this.save();
};

// Check if ebook is on sale
ebookSchema.virtual('isOnSale').get(function() {
  return this.discountPrice && this.discountPrice < this.price;
});

// Get current price
ebookSchema.virtual('currentPrice').get(function() {
  return this.isOnSale ? this.discountPrice : this.price;
});

// Format price with currency
ebookSchema.methods.formatPrice = function() {
  const price = this.currentPrice;
  const formatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: this.currency,
  });
  return formatter.format(price / 100); // Convert from kobo to Naira
};

// Increment sales count
ebookSchema.methods.incrementSales = async function() {
  this.salesCount += 1;
  await this.save();
};

// Get affiliate commission amount
ebookSchema.methods.getAffiliateCommission = function() {
  return Math.floor(this.currentPrice * this.affiliateCommissionRate);
};

const Ebook = mongoose.model('Ebook', ebookSchema);

module.exports = Ebook;