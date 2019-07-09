const mongoose = require("mongoose");
const Manufacturer = mongoose.model("manufacturers");
const { uploadManuImage } = require("../middlewares/uploadFile");
const multer = require("multer");
const upload = multer();
const _ = require("lodash");
module.exports = app => {
  app.get("/api/manufacturers", async (req, res) => {
    try {
      let manu = await Manufacturer.find();
      res.send(_.reverse(manu));
    } catch (err) {
      res.send(err);
    }
  });
  app.get("/api/manufacturer/:id", async (req, res) => {
    let manu = await Manufacturer.findById(req.params.id);
    res.status(200).send(manu);
  });
  app.post("/api/manufacturer/delete", async (req, res) => {
    // await Manufacturer.deleteMany();
    // let data= await Manufacturer.find();
    // res.send(data);
  });

  app.post(
    "/api/manufacturer",
    uploadManuImage("uploads/manu", "manuImage"),
    async (req, res, next) => {
      const manu_img = req.file;
      let image_url = "";
      if (manu_img) {
        image_url = manu_img.filename;
      }
      req.body.image = image_url;
      next();
    },
    async (req, res, next) => {
      const { name, image } = req.body;
      const manufacturer = new Manufacturer({
        name,
        image
      });
      try {
        await manufacturer.save();
        res.status(200).send("success");
      } catch (err) {
        res.status(400).send("error");
      }
    }
  );
  app.put(
    "/api/manufacturer",
    uploadManuImage("uploads/manu", "manuImage"),
    async (req, res, next) => {
      const manu_img = req.file;
      let image_url = "";
      if (manu_img) {
        image_url = manu_img.filename;
      }
      req.body.image = image_url;
      next();
    },
    async (req, res, next) => {
      const { _id, name, image } = req.body;
      try {
        if (image == "") {
          await Manufacturer.findByIdAndUpdate(_id, { name });
        } else {
          await Manufacturer.findByIdAndUpdate(_id, { name, image });
        }
        res.status(200).send("success");
      } catch (err) {
        res.status(400).send("error");
      }
    }
  );
  app.delete("/api/manufacturer/:id",async(req,res)=>{
    await Manufacturer.findByIdAndRemove(req.params.id);
    res.status(200).send("success");
  })
};
