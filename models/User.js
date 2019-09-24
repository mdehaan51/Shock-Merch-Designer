const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  business: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  location: {
    type: String,
    required: false
  },
  resetPasswordToken: {
    type: String,
    required: false
  },
  resetPasswordExpires: {
    type: Number,
    required: false
  },
  admin: {
    type: Boolean,
    default: false
  }
});
module.exports = User = mongoose.model("users", UserSchema);
