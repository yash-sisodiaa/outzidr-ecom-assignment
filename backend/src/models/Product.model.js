const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  tenantId: { type: String, required: true, index: true },
  name: { type: String, required: true },
  sku: { type: String, required: true },
  description: String,
  basePrice: { type: Number, required: true, min: 0 },
  inventory: { type: Number, default: 0, min: 0 }
}, { timestamps: true });


productSchema.index({ tenantId: 1, sku: 1 }, { unique: true });

module.exports = mongoose.model('Product', productSchema);