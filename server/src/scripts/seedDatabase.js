const mongoose = require('mongoose');
require('dotenv').config(); // This is IMPORTANT

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding for MongoDB Atlas...');
    
    // IMPORTANT: Load from .env file or provide directly
    const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://mustaeenms_db_user:tn0EFjb6fUsNAR4x@suicidenote.bchvrp1.mongodb.net/suicidenote?retryWrites=true&w=majority";
    
    if (!MONGODB_URI) {
      console.error('❌ MONGODB_URI is not defined in .env file');
      console.log('💡 Please add to your .env file:');
      console.log('MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ebook-store');
      process.exit(1);
    }
    
    console.log(`🔗 Connecting to: ${MONGODB_URI.replace(/\/\/[^@]+@/, '//***:***@')}`);
    
    // Atlas connection with proper options
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // These are important for Atlas:
      retryWrites: true,
      w: 'majority',
      serverSelectionTimeoutMS: 30000, // 30 seconds
      socketTimeoutMS: 45000, // 45 seconds
    });
    
    console.log('✅ Connected to MongoDB Atlas!');
    
    // Check if we're connected to the right database
    const db = mongoose.connection.db;
    const dbName = db.databaseName;
    console.log(`📊 Using database: ${dbName}`);
    
    // Dynamically load the Ebook model
    const Ebook = require('../models/Ebook.model');
    
    // 1. Check if ebook already exists
    const existingEbook = await Ebook.findOne({ slug: "suicide-note-2026" });
    
    if (existingEbook) {
      console.log('📚 Ebook already exists:', {
        id: existingEbook._id,
        slug: existingEbook.slug,
        title: existingEbook.title,
        price: existingEbook.price,
        isPublished: existingEbook.isPublished
      });
    } else {
      // 2. Create the ebook
      console.log('Creating new ebook...');
      const ebook = new Ebook({
        title: "Suicide Note",
        slug: "suicide-note-2026",
        author: "Loba Yusuf",
        description: "A powerful Nigerian fiction exploring mental health, depression, and the journey to healing through community and connection in Lagos, Nigeria.",
        shortDescription: "A raw, honest portrayal of depression and hope in modern Nigeria.",
        coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c",
        previewContent: "CHAPTER ONE: THE NOTE BEGINS\n\nI'm writing this because I need someone to understand...",
        fullContent: "[Full book content here]",
        price: 2500,
        currency: "NGN",
        category: "mental-health",
        tags: ["fiction", "mental-health", "nigeria", "depression"],
        isPublished: true,
        affiliateCommissionRate: 0.5,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      await ebook.save();
      console.log('✅ Ebook created successfully:', {
        id: ebook._id,
        slug: ebook.slug,
        title: ebook.title,
        price: ebook.price,
        isPublished: ebook.isPublished
      });
    }
    
    // 3. Count and list all ebooks
    const totalEbooks = await Ebook.countDocuments();
    console.log(`\n📚 Total ebooks in database: ${totalEbooks}`);
    
    const allEbooks = await Ebook.find({});
    console.log('📋 All ebooks:');
    allEbooks.forEach((ebook, index) => {
      console.log(`  ${index + 1}. ${ebook.slug}: "${ebook.title}" (${ebook.price} NGN) - Published: ${ebook.isPublished}`);
    });
    
    // 4. Verify the specific ebook we need
    const targetEbook = await Ebook.findOne({ 
      slug: "suicide-note-2026",
      isPublished: true 
    });
    
    if (targetEbook) {
      console.log('\n🎯 SUCCESS! Payment-ready ebook found:');
      console.log(`   Slug: ${targetEbook.slug}`);
      console.log(`   Title: ${targetEbook.title}`);
      console.log(`   Price: ${targetEbook.price} NGN`);
      console.log(`   Published: ${targetEbook.isPublished}`);
      console.log(`   ID: ${targetEbook._id}`);
    } else {
      console.log('\n⚠️ WARNING: Ebook not found or not published!');
      console.log('   Check that isPublished is set to true');
    }
    
    await mongoose.disconnect();
    console.log('\n🎉 Database seeding completed!');
    console.log('🔌 Disconnected from MongoDB Atlas');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    
    // Common Atlas errors:
    if (error.message.includes('authentication failed')) {
      console.log('\n💡 AUTHENTICATION ERROR:');
      console.log('1. Check your username/password in the connection string');
      console.log('2. Make sure your IP is whitelisted in Atlas');
      console.log('3. Check if the database user has correct permissions');
    } else if (error.message.includes('ENOTFOUND')) {
      console.log('\n💡 NETWORK ERROR:');
      console.log('1. Check your internet connection');
      console.log('2. Verify the cluster URL is correct');
    } else if (error.message.includes('timed out')) {
      console.log('\n💡 TIMEOUT ERROR:');
      console.log('1. Increase timeout in connection options');
      console.log('2. Check firewall settings');
    }
    
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
}

// Run the function
seedDatabase();