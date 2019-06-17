const mongoose = require("mongoose");
const { Schema } = mongoose;
const manufacturerSchema = new Schema({
  name: String,
  image: { type: String, default: "noimage.jpg" }
});
mongoose.model("manufacturers", manufacturerSchema);
module.exports = colorSchema;
