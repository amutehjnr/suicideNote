const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

async function fixAffiliateTokens() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined');
    }

    console.log('📦 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    const Affiliate = require('../models/Affiliate.model');
    
    // Find all affiliates that don't have a dashboardToken
    const affiliates = await Affiliate.find({ 
      $or: [
        { dashboardToken: { $exists: false } },
        { dashboardToken: null }
      ]
    });
    
    console.log(`📊 Found ${affiliates.length} affiliates without dashboard tokens`);
    
    let updated = 0;
    
    for (const affiliate of affiliates) {
      // Generate a unique dashboard token
      const dashboardToken = 'aff_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      
      affiliate.dashboardToken = dashboardToken;
      await affiliate.save();
      
      updated++;
      console.log(`✅ Added token to affiliate: ${affiliate.affiliateCode} -> ${dashboardToken}`);
      console.log(`   Dashboard URL: https://suicidenote.onrender.com/affiliate/token/${dashboardToken}`);
    }
    
    console.log(`\n🎉 Migration complete! Updated ${updated} affiliates`);
    
    // Also check all affiliates to verify
    const allAffiliates = await Affiliate.find({});
    console.log(`\n📊 All affiliates (${allAffiliates.length}):`);
    allAffiliates.forEach(aff => {
      console.log(`   ${aff.affiliateCode}: ${aff.dashboardToken ? '✅ Has token' : '❌ No token'}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration error:', error);
    process.exit(1);
  }
}

fixAffiliateTokens();