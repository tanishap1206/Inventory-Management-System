require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const db = require('../config/db');

(async () => {
  await db.connect();
  const exists = await User.findOne({ email: 'admin@college.edu' });
  if (exists) { console.log('Admin exists'); process.exit(); }
  const admin = new User({ name: 'Principal', email: 'admin@college.edu', role: 'admin' });
  await admin.setPassword('AdminPassword123'); // change later!
  await admin.save();
  console.log('Admin created:', admin.email);
  process.exit();
})();
