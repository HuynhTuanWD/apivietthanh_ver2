const mongoose = require("mongoose");
const { Schema } = mongoose;
const departmentSchema = new Schema({
  name: String,
  address: String
});

mongoose.model("departments", departmentSchema);
module.exports = departmentSchema;
