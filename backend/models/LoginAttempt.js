const mongoose = require('mongoose');

const loginAttemptSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // null for failed attempts with non-existent users
  },
  email: {
    type: String,
    required: true,
    index: true
  },
  success: {
    type: Boolean,
    required: true,
    index: true
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'staff', 'guest'],
    required: true
  },
  ipAddress: String,
  userAgent: String,
  failureReason: String,
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  }
});

// Add indexes for common queries
loginAttemptSchema.index({ userId: 1, success: 1 });
loginAttemptSchema.index({ email: 1, success: 1 });
loginAttemptSchema.index({ timestamp: -1 });

module.exports = mongoose.model('LoginAttempt', loginAttemptSchema);