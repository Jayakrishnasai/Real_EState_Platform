const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  amenities: [{ type: String }],
  imageUrl: { type: String },
  bedrooms: { type: Number },
  bathrooms: { type: Number },
  area: { type: Number } // square feet
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);
