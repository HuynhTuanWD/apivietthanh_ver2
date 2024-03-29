const mongoose = require("mongoose");
const { Schema } = mongoose;
const manufacturerSchema = new Schema({
  name: String,
  image: { type: String, default: "" }
});
mongoose.model("Manufacturer", manufacturerSchema);
module.exports = manufacturerSchema;
