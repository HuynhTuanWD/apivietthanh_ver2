const mongoose = require("mongoose");
const { Schema } = mongoose;
const commentSchema = new Schema({
  title: String,
  content: String,
  star: Number,
  createAt: Date,
  images: [String],
  _customer: { type: Schema.Types.ObjectId, ref: "Customer" },
  _product: { String }
});
commentSchema.pre("save", function(next) {
  let now = Date.now();
  if (!this.createAt) {
    this.createAt = now;
  }
  next();
});
mongoose.model("comments", commentSchema);
module.exports = commentSchema;
