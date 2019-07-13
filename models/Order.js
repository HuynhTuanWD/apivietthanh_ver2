const mongoose = require("mongoose");
const { Schema } = mongoose;
const orderDetailSchema = require("./OrderDetail");

const orderSchema = new Schema({
  _customer: { type: Schema.Types.ObjectId, ref: "Customer" },
  address: [String],
  status: { type: Number, default: 1 },
  orderDetails: [orderDetailSchema]
});

mongoose.model("Order", orderSchema);
module.exports = orderSchema;
