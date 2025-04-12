const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema({
  origin: String,
  destination: String,
  status: { type: String, enum: ['Pending', 'In Transit', 'Delivered'], default: 'Pending' },
  assignedDriver: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  eta: Date
}, { timestamps: true });

const shipment = mongoose.model('Shipment',shipmentSchema)
module.exports = shipment



