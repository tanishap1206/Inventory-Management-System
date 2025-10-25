const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  details: String,
  performedBy: String
}, { _id: false });

const assetSchema = new mongoose.Schema({
  assetId: { type: String, required: true, index: true },
  name: { type: String, required: true },
  category: String,
  assignedTo: String,
  purchaseDate: Date,
  brand: String,
  serialNumber: String,
  warrantyExpires: Date,
  status: { type: String, enum: ['working', 'under_repair', 'retired'], default: 'working' },
  maintenanceHistory: [maintenanceSchema],
  location: String,
  metadata: { type: mongoose.Schema.Types.Mixed },
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Asset', assetSchema);
