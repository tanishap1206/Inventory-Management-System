const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  itemId: { type: String, required: true, index: true },
  name: { type: String, required: true },
  category: { type: String, default: 'general' },
  quantity: { type: Number, default: 0 },
  location: { type: String, default: '' },
  metadata: { type: mongoose.Schema.Types.Mixed },
  lastUpdated: { type: Date, default: Date.now },
  brand: String,
classification: String // e.g., "stationery", "electronics"

});

module.exports = mongoose.model('Inventory', inventorySchema);
