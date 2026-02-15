const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import Admin model
const Admin = require('../models/Admin.model');

async function createAdmin() {
  try {
    // Connect to MongoDB
    console.log('📦 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Admin details - CHANGE THESE!
    const adminData = {
      email: 'mustaeenms@gmail.com', // Your email
      password: 'Musamarch@121', // Change this to a strong password
      name: 'Mustaeen',
      role: 'superadmin',
      permissions: [
        'view_dashboard',
        'manage_transactions',
        'manage_access_codes',
        'manage_users',
        'manage_affiliates',
        'manage_admins',
        'send_free_access',
        'process_refunds',
        'export_data'
      ],
      isActive: true
    };

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: adminData.email });
    
    if (existingAdmin) {
      console.log('⚠️ Admin already exists with this email');
      
      // Update existing admin to superadmin if needed
      if (existingAdmin.role !== 'superadmin') {
        existingAdmin.role = 'superadmin';
        existingAdmin.permissions = adminData.permissions;
        await existingAdmin.save();
        console.log('✅ Updated existing admin to superadmin');
      }
      
      await mongoose.disconnect();
      return;
    }

    // Create new admin
    const admin = new Admin(adminData);
    await admin.save();

    console.log('✅ Admin created successfully!');
    console.log('📧 Email:', admin.email);
    console.log('👤 Name:', admin.name);
    console.log('🔑 Role:', admin.role);
    console.log('');
    console.log('🌐 You can now login at: https://suicidenote.onrender.com/admin/signin');
    console.log('⚠️  Please change your password after first login');

  } catch (error) {
    console.error('❌ Error creating admin:', error);
  } finally {
    await mongoose.disconnect();
    console.log('📦 Disconnected from MongoDB');
    process.exit(0);
  }
}

// Run the function
createAdmin();