const mongoose = require("mongoose");
const User = mongoose.model("users");
module.exports = app => {
  app.post("/api/user", async (req, res) => {
    const { name } = req.body;
    const product = new Product({
      name
    });
    await product.save(function(err) {
      if (err) {
        console.log(err);
      }
    });
    // const products = await Product.find();
    res.send(product);
  });
};
