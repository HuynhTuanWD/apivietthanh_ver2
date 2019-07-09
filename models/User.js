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
userSchema.pre("save", function(next) {
  let now = Date.now();
  if (!this.createAt) {
    this.createAt = now;
  }
  let user = this;
  this.password = bcrypt.hashSync(user.password, 10);
  // console.log(this.password);
  next();
});
mongoose.model("users", userSchema);
const User = mongoose.model("users");

module.exports = userSchema;
