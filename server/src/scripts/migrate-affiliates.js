// scripts/migrate-affiliates.js
const mongoose = require('mongoose');
const Affiliate = require('../models/Affiliate.model');
require('dotenv').config();

async function migrateAffiliates() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    const affiliates = await Affiliate.find({});
    console.log(`📊 Found ${affiliates.length} affiliates to migrate`);
    
    let updated = 0;
    
    for (const affiliate of affiliates) {
      let changed = false;
      
      // Initialize missing fields
      if (typeof affiliate.totalEarnings !== 'number') {
        affiliate.totalEarnings = 0;
        changed = true;
      }
      if (typeof affiliate.pendingEarnings !== 'number') {
        affiliate.pendingEarnings = 0;
        changed = true;
      }
      if (typeof affiliate.paidEarnings !== 'number') {
        affiliate.paidEarnings = 0;
        changed = true;
      }
      if (typeof affiliate.totalReferrals !== 'number') {
        affiliate.totalReferrals = 0;
        changed = true;
      }
      if (typeof affiliate.successfulReferrals !== 'number') {
        affiliate.successfulReferrals = 0;
        changed = true;
      }
      if (!affiliate.referrals) {
        affiliate.referrals = [];
        changed = true;
      }
      if (!affiliate.sales) {
        affiliate.sales = [];
        changed = true;
      }
      if (!affiliate.campaigns) {
        affiliate.campaigns = [];
        changed = true;
      }
      
      if (changed) {
        await affiliate.save();
        updated++;
        console.log(`✅ Updated affiliate: ${affiliate.affiliateCode}`);
      }
    }
    
    console.log(`\n🎉 Migration complete! Updated ${updated} affiliates`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration error:', error);
    process.exit(1);
  }
}

migrateAffiliates();