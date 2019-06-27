const mongoose = require("mongoose");
const { Schema } = mongoose;
const customerSchema = new Schema({
  name: String,
  phone: { type: String, index: true, unique: true },
  email: { type: String, index: true, unique: true },
  password: String,
  avatar: String,
  createAt: Date,
  role: { type: Number, default: 1 } // 1: customer
});
customerSchema.pre("save", function(next) {
  let now = Date.now();
  if (!this.createAt) {
    this.createAt = now;
  }
  next();
});
mongoose.model("customers", customerSchema);
module.exports = customerSchema;
