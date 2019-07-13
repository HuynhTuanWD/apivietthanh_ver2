const mongoose = require("mongoose");
const Product = mongoose.model("Product");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const {
  uploadProductImage,
  uploadProductImages
} = require("../middlewares/uploadFile");
module.exports = app => {
  app.get("/api/products", async (req, res) => {
    let products = await Product.find()
      .populate("_categories")
      // .populate("_departments")
      // .populate("_manufacturer");
    res.send(_.reverse(products));
  });
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
      // console.log(req.headers.authorization);
      let jwt_user = jwt.verify(
        req.headers.authorization,
        process.env.SECRET_KEY
      );
      let _user = jwt_user.userId;

      let idx = -1;
      let images = req.body.fileStatus.map(item => {
        if (item === "ADD") {
          idx++;
          return req.files[0].filename;
        }
        return "";
      });
      let product = new Product({
        ...JSON.parse(req.body.product),
        images,
        _user
      });
      try {
        await product.save();
        res.send("success");
      } catch (err) {
        res.status(400).send("invalid input");
      }
    }
  );
  app.post(
    "/api/product/images",
    uploadProductImages("uploads/product", "productImages", 4),
    async (req, res) => {
      if (req.file) {
        res.status(200).send(req.file.filename);
      } else {
        res.status(400).send("no image");
      }
    }
  );
};
