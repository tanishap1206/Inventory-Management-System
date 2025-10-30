require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const db = require('../config/db');

const seedUsers = async () => {
  try {
    await db.connect();
    console.log('\nConnected to MongoDB Atlas');
    
    // Create or update admin user
    const adminEmail = 'admin@college.edu';
    const adminPassword = 'Admin123!';
    
    let admin = await User.findOne({ email: adminEmail });
    
    if (!admin) {
      admin = new User({
        name: 'College Administrator',
        email: adminEmail,
        role: 'admin'
      });
      await admin.setPassword(adminPassword);
      await admin.save();
      console.log('\n✅ Admin user created successfully');
    } else {
      await admin.setPassword(adminPassword);
      await admin.save();
      console.log('\n✅ Admin password updated');
    }

    console.log('\nAdmin Credentials:');
    console.log('------------------');
    console.log(`📧 Email: ${adminEmail}`);
    console.log(`🔑 Password: ${adminPassword}`);
    console.log('------------------');

    // Create or update test user
    const userEmail = 'user@college.edu';
    const userPassword = 'User123!';
    
    let testUser = await User.findOne({ email: userEmail });
    
    if (!testUser) {
      testUser = new User({
        name: 'Test User',
        email: userEmail,
        role: 'user'
      });
      await testUser.setPassword(userPassword);
      await testUser.save();
      console.log('\n✅ Test user created successfully');
      console.log('\nTest User Credentials:');
      console.log('------------------');
      console.log(`📧 Email: ${userEmail}`);
      console.log(`🔑 Password: ${userPassword}`);
      console.log('------------------');
    }

    // Display all users
    const users = await User.find({}, 'email role');
    console.log('\nAll Users in Database:');
    console.log('------------------');
    users.forEach(user => {
      console.log(`👤 ${user.email} (${user.role})`);
    });
    console.log('------------------');

  } catch (error) {
    console.error('❌ Error seeding users:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
    process.exit();
  }
};

seedUsers();
