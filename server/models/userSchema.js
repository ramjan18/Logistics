const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone : String ,
  role: { type: String, enum: ['Admin', 'Manager', 'Customer', 'Driver'], default: 'Manager' }
});

const user = mongoose.model('User',userSchema)
module.exports = user
