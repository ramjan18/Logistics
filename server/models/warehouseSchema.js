const mongoose = require("mongoose");

const warehouseSchema = new mongoose.Schema({
  name: String,
  location: String,
  inventory: [{
    item: String,
    quantity: Number
  }]
});

const warehouse = mongoose.model('warehouse',warehouseSchema)
module.exports = warehouse

