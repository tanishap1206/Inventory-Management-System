const mongoose = require('mongoose');

exports.connect = async () => {
  const dbType = process.env.DB_TYPE || 'mongo';
  if (dbType !== 'mongo') {
    console.log('DB_TYPE != mongo, skipping mongoose connect');
    return;
  }
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('MONGO_URI not set in .env');
    process.exit(1);
  }
  try {
    await mongoose.connect(uri, { dbName: 'smart_inventory' });
    console.log('Connected to MongoDB Atlas');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};
