const mongoose = require("mongoose");
const { Schema } = mongoose;
const departmentSchema = new Schema({
  name: String,
  address: String
});

mongoose.model("Department", departmentSchema);
module.exports = departmentSchema;
