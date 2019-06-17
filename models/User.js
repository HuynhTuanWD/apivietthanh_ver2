const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const userSchema = new Schema({
  name: String,
  username: { type: String, index: true, unique: true },
  password: { type: String, required: true },
  avatar: String,
  createAt: Date
});
customerSchema.statics.authenticate = async (email,password) => {
  
};
customerSchema.pre("save", function(next) {
  let now = Date.now();
  if (!this.createAt) {
    this.createAt = now;
  }
  let user = this;
  this.password = bcrypt.hashSync(user.password, process.env.SECRET_KEY);
  next();
});
mongoose.model("users", userSchema);
module.exports = userSchema;
