// scripts/fix-indexes.js
const mongoose = require('mongoose');
require('dotenv').config();

async function fixIndexes() {
  try {
    console.log('🔧 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const db = mongoose.connection.db;
    const collection = db.collection('purchases');

    // Get all indexes
    const indexes = await collection.indexes();
    console.log('📊 Current indexes:', indexes.map(idx => idx.name));

    // Drop the problematic unique index if it exists
    try {
      await collection.dropIndex('transactionReference_1');
      console.log('✅ Dropped index: transactionReference_1');
    } catch (error) {
      console.log('ℹ️ Index transactionReference_1 does not exist or could not be dropped:', error.message);
    }

    // Create new sparse index
    try {
      await collection.createIndex(
        { transactionReference: 1 }, 
        { 
          name: 'transactionReference_sparse',
          sparse: true,
          background: true 
        }
      );
      console.log('✅ Created new sparse index: transactionReference_sparse');
    } catch (error) {
      console.log('ℹ️ Could not create sparse index:', error.message);
    }

    // Ensure other useful indexes
    const desiredIndexes = [
      { key: { user: 1 }, name: 'user_idx' },
      { key: { ebook: 1 }, name: 'ebook_idx' },
      { key: { paystackReference: 1 }, options: { sparse: true }, name: 'paystackReference_sparse' },
      { key: { stripeSessionId: 1 }, options: { sparse: true }, name: 'stripeSessionId_sparse' },
      { key: { status: 1 }, name: 'status_idx' },
      { key: { createdAt: -1 }, name: 'createdAt_desc_idx' },
    ];

    for (const idx of desiredIndexes) {
      try {
        const exists = indexes.some(i => i.name === idx.name);
        if (!exists) {
          await collection.createIndex(idx.key, idx.options || {});
          console.log(`✅ Created index: ${idx.name}`);
        } else {
          console.log(`ℹ️ Index already exists: ${idx.name}`);
        }
      } catch (error) {
        console.log(`❌ Failed to create index ${idx.name}:`, error.message);
      }
    }

    console.log('🎉 Index fix completed!');
    process.exit(0);
  } catch (error) {
    console.error('🔥 Error fixing indexes:', error);
    process.exit(1);
  }
}

fixIndexes();