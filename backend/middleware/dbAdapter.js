const dbType = (process.env.DB_TYPE || 'mongo').toLowerCase();
let service;
if (dbType === 'mongo') {
  service = require('../services/mongoService');
} else {
  console.warn(`DB_TYPE=${dbType} not implemented, defaulting to mongo`);
  service = require('../services/mongoService');
}
module.exports = service;
