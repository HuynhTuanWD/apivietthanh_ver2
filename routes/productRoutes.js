const mongoose = require("mongoose");
const Product = mongoose.model("products");
const {
  uploadProductImage,
  uploadProductImages
} = require("../middlewares/uploadFile");
module.exports = app => {
  app.post(
    "/api/product/image",
    uploadProductImage("uploads/product", "productImage"),
    async (req, res) => {
      if (req.file) {
        res.status(200).send(req.file.filename);
      } else {
        res.status(400).send("no image");
      }
    }
  );
  app.post(
    "/api/product",
    uploadProductImages("uploads/product", "productImages", 4),
    async (req, res) => {
      console.log(req.files);
      res.status(200).send("");
    }
  );
};
