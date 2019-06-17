const mongoose = require("mongoose");
const moment = require('moment-timezone');
const { Schema } = mongoose;
const colorSchema = require("./Color");
const uniqueSlug = require('unique-slug')
const productSchema = new Schema({
  name: String,
  images: { type: [String], default: ["noimage.jpg"] },
  slug: String,
  price: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  discountonline: { type: Number, default: 0 },
  colors: [colorSchema],
  _manufacturer: { type: Schema.Types.ObjectId, ref: "Manufacturer" },
  _categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  description: String,
  short_description: String,
  technical_spec: String,
  _comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  quantity: Number,
  status: { type: Number, default: 1 },
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  isLabelNew: Boolean,
  isLabelPrice: Boolean,
  departments: [{ type: Schema.Types.ObjectId, ref: "Department" }],
  isActive: { type: Boolean, default: true },
  createdAt: Date,
  updatedAt: Date
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
  return myText+uniqueSlug();
}
productSchema.pre("save", function(next) {
  this.slug = slugWithDate(this.name);
  let now = date.now();
  this.updatedAt = now;
  // Set a value for createdAt only if it is null
  if (!this.createdAt) {
    this.createdAt = now;
  }
  // Call the next function in the pre-save chain
  next();
});
mongoose.model("products", productSchema);
module.exports = productSchema;