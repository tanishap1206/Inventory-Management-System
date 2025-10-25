const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "Room 101"
  building: String,                       // e.g., "Science Block"
  floor: String,
  type: { type: String, enum: ['room','store','lab','office'], default: 'room' },
  metadata: mongoose.Schema.Types.Mixed
});

module.exports = mongoose.model('Location', locationSchema);
