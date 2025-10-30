const fs = require('fs');
const path = require('path');

// Required environment variables
const requiredEnvVars = {
  MONGO_URI: 'MongoDB connection string (mongodb://...)',
  JWT_SECRET: 'Secret key for JWT tokens',
  PORT: 'Port number (default: 5000)',
};

// Optional environment variables with defaults
const optionalEnvVars = {
  NODE_ENV: 'development',
  JWT_EXPIRES_IN: '7d',
};

function validateEnv() {
  console.log('\n🔍 Checking environment configuration...');
  
  // Check if .env file exists
  const envPath = path.join(__dirname, '..', '.env');
  if (!fs.existsSync(envPath)) {
    console.error('\n⛔ No .env file found!');
    console.error('Please create a .env file in the backend directory with the following variables:\n');
    Object.entries(requiredEnvVars).forEach(([key, desc]) => {
      console.error(`${key}=<${desc}>`);
    });
    Object.entries(optionalEnvVars).forEach(([key, value]) => {
      console.error(`${key}=${value} (optional)`);
    });
    process.exit(1);
  }

  // Check required environment variables
  const missingVars = [];
  Object.keys(requiredEnvVars).forEach(key => {
    if (!process.env[key]) {
      missingVars.push(key);
    }
  });

  // Set defaults for optional variables
  Object.entries(optionalEnvVars).forEach(([key, value]) => {
    if (!process.env[key]) {
      process.env[key] = value;
      console.log(`ℹ️  Using default value for ${key}: ${value}`);
    }
  });

  if (missingVars.length > 0) {
    console.error('\n⛔ Missing required environment variables:');
    missingVars.forEach(key => {
      console.error(`- ${key}: ${requiredEnvVars[key]}`);
    });
    process.exit(1);
  }

  console.log('✅ Environment configuration valid\n');
}

module.exports = validateEnv;