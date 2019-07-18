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
      .populate("_departments")
      .populate("_manufacturer");
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
          return req.files[idx].filename;
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
  app.put(
    "/api/product/:_id",
    uploadProductImages("uploads/product", "productImages", 4),
    async (req, res) => {
      // console.log(req.headers.authorization);
      let jwt_user = jwt.verify(
        req.headers.authorization,
        process.env.SECRET_KEY
      );
      let _user = jwt_user.userId;

      let ori_images = await Product.findById(req.params._id,"images");
      ori_images = ori_images.images;
      let idx = -1;
      let images = req.body.fileStatus.map((item,idx_item) => {
        if (item === "UPDATE") {
          idx++;
          return req.files[idx].filename;
        }
        return ori_images[idx_item];
      });
      try {
        await Product.findByIdAndUpdate(req.params._id,{
          ...JSON.parse(req.body.product),
          images,
          _user
        })
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
  app.get("/api/product/:_id", async (req, res) => {
    const _id = req.params._id;
    try {
      const product = await Product.findById(_id);
      res.send(product);
    } catch (err) {
      res.status(400).send("invalid product id");
    }
  });
  app.post("/api/products/deletes", async (req, res) => {
    await Product.deleteMany();
    res.send("delete success");
  });
};
