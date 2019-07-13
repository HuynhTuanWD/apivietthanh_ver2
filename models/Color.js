const mongoose = require("mongoose");
const { Schema } = mongoose;

const colorSchema = new Schema({
  name: String,
  hex: String
});

mongoose.model("Color", colorSchema);
module.exports = colorSchema;
