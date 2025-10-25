const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  type: { type: String, enum: ['maintenance','purchase','update'], required: true },
  title: String,
  details: String,
  raisedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assetId: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset' }, // optional link
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory' }, // optional
  status: { type: String, enum: ['open','in_progress','approved','rejected','closed'], default: 'open' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // admin/staff handling it
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  comments: [{ by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, text: String, date: Date }]
});

module.exports = mongoose.model('Request', requestSchema);
