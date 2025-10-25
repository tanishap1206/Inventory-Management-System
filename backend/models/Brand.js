const mongoose = require('mongoose');
const brandSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  meta: mongoose.Schema.Types.Mixed
});
module.exports = mongoose.model('Brand', brandSchema);
