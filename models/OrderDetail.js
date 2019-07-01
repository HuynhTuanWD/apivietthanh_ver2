const mongoose = require("mongoose");
const { Schema } = mongoose;
const orderDetailSchema = new Schema({
  name: String,
  quantity: Number,
  price: Number,
  images: { type: [String], default: [] },
});
mongoose.model("orderDetails", orderDetailSchema);
module.exports = orderDetailSchema;
