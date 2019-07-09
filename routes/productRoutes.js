const mongoose = require("mongoose");
const Product = mongoose.model("products");
const { uploadProductImage } = require("../middlewares/uploadFile");
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
  app.post(
    "/api/product/image",
    uploadProductImage("uploads/product", "productImage"),
    async (req, res) => {
      if(req.file){
        res.status(200).send(req.file.filename);
      }else{
        res.status(400).send("no image");
      }
    }
  );
};
