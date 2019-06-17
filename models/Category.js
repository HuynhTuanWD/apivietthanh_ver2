const mongoose = require("mongoose");
const moment = require('moment');
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: String,
  slug: String,
  order: Number,
  isActive: { type: Number, default: 1 },
  _category: { type: Schema.Types.ObjectId, ref: "Category" }
});
function slugWithDate(text) {
  let myText = text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
  let date = moment(this.date);
  let formatted = date.format("YYYY[-]MM[-]DD[-]");
  return formatted + myText;
}
categorySchema.pre("save", function(next) {
  this.slug = slugWithDate(this.name);
  next();
});
mongoose.model("comments", commentSchema);
module.exports = categorySchema;
