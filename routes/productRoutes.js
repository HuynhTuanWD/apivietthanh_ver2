const mongoose = require("mongoose");
const Product = mongoose.model("products");
module.exports = app => {
  app.post("/api/product", async (req, res) => {
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
