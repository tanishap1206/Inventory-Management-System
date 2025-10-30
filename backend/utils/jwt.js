const jwt = require('jsonwebtoken');

// Get JWT configuration from environment variables
const secret = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRES_IN || '7d';

// Validate JWT secret
if (!secret) {
  console.error('JWT_SECRET not set in environment variables');
  process.exit(1);
}

exports.sign = (payload) => {
  try {
    return jwt.sign(payload, secret, { expiresIn });
  } catch (err) {
    console.error('Error signing JWT:', err);
    throw new Error('Authentication token generation failed');
  }
};

exports.verify = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    console.error('Error verifying JWT:', err);
    throw new Error('Invalid authentication token');
  }
};
