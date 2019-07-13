const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const userSchema = new Schema({
  name: String,
  username: { type: String, index: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: "" },
  createAt: { type: Date, default: Date.now() },
  role: { type: Number, default: 1 }, // 1: Admin
  isActive: { type: Boolean, default: true }
});
// update ko chạy, phải sử dụng hàm presave 
mongoose.model("User", userSchema);

module.exports = userSchema;