const mongoose = require('mongoose');

let isConnected = false;

exports.connect = async () => {
  if (isConnected) {
    console.log('📦 Using existing database connection');
    return;
  }

  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI not set in environment variables');
  }

  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      retryWrites: true,
      dbName: 'smart_inventory'
    };

    await mongoose.connect(uri, options);
    isConnected = true;

    const db = mongoose.connection;
    const collections = await db.db.listCollections().toArray();
    
    console.log('\n📦 Connected to MongoDB Atlas');
    console.log('   Database: smart_inventory');
    console.log('   Collections:', collections.map(c => c.name).join(', '));

    // Handle connection errors after initial connection
    db.on('error', (error) => {
      console.error('\n⛔ MongoDB connection error:', error);
      isConnected = false;
    });

    db.on('disconnected', () => {
      console.log('\n📦 MongoDB disconnected');
      isConnected = false;
    });

    return db;
  } catch (error) {
    console.error('\n⛔ MongoDB connection error:', error);
    isConnected = false;
    throw error;
  }
};

exports.disconnect = async () => {
  if (!isConnected) {
    return;
  }
  
  try {
    await mongoose.connection.close();
    isConnected = false;
    console.log('\n📦 MongoDB disconnected successfully');
  } catch (error) {
    console.error('\n⛔ Error disconnecting from MongoDB:', error);
    throw error;
  }
};

exports.isConnected = () => isConnected;