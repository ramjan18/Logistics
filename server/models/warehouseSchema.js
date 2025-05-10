// models/Warehouse.js

const mongoose = require("mongoose");

const warehouseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    lat: {
      type: Number,
      // required: true,
    },
    lng: {
      type: Number,
      // required: true,
    },
  },
  capacity:{
    type : Number,
  },
  currentStock: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Warehouse", warehouseSchema);
