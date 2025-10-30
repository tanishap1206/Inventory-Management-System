const mongoose = require('mongoose');
require('dotenv').config();

async function testConnection() {
  try {
    const uri = process.env.MONGO_URI;
    console.log('Attempting to connect to MongoDB...');
    console.log('URI:', uri.replace(/\/\/([^:]+):([^@]+)@/, '//[USERNAME]:[PASSWORD]@')); // Hide credentials in log
    
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('Successfully connected to MongoDB!');
    
    // Test database operations
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('\nAvailable collections:', collections.map(c => c.name));
    
  } catch (error) {
    console.error('Connection error:', error.message);
    if (error.name === 'MongoServerError') {
      console.log('\nTroubleshooting tips:');
      console.log('1. Check if username and password are correct');
      console.log('2. Verify IP address is whitelisted in MongoDB Atlas');
      console.log('3. Check if the cluster is running');
      console.log('4. Verify the connection string format');
    }
  } finally {
    await mongoose.connection.close();
    console.log('\nConnection closed');
  }
}

testConnection();