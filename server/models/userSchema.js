const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['Admin', 'Manager', 'Driver'], default: 'Manager' }
});

const user = mongoose.model('user',userSchema)
module.exports = user
