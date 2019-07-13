const mongoose = require("mongoose");
const moment = require("moment-timezone");
const { Schema } = mongoose;
const colorSchema = require("./Color");
const uniqueSlug = require("unique-slug");
const productSchema = new Schema({
  name: String,
  images: { type: [String], default: [] },
  slug: String,
  price: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  discountOnline: { type: Number, default: 0 },
  colors: [colorSchema],
  _manufacturer: { type: Schema.Types.ObjectId, ref: "Manufacturer" },
  _categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  description: Object,
  shortDescription: Object,
  technicalSpec: Object,
  _comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  quantity: Number,
  status: { type: Number, default: 1 },
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  isLabelNew: Boolean,
  isLabelPrice: Boolean,
  _departments: [{ type: Schema.Types.ObjectId, ref: "Department" }],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() }
});
// dùng hàm find({ subjects : req.params.subjectId }) subjects tương ứng với array ObjectId
function slugWithDate(text) {
  let myText = text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
  return myText + uniqueSlug();
}
mongoose.model("products", productSchema);
module.exports = productSchema;
