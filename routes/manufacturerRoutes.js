const mongoose = require("mongoose");
const Manufacturer = mongoose.model("manufacturers");
const { uploadManuImage } = require("../middlewares/uploadFile");
module.exports = app => {
  app.get("/api/manufacturer", async (req, res) => {
    try {
      let manu = await Manufacturer.find();
      res.send(manu);
    } catch (err) {
      res.send(err);
    }
  });
  app.post(
    "/api/manufacturer",
    async (req, res, next) => {
      const { name } = req.body;
      const manufacturer = new Manufacturer({
        name
      });
      try {
        await manufacturer.save();
        const _id = manufacturer._id;
        req.params._id = _id;
      } catch (err) {
        req.params._id = 0;
      }
      next();
    },
    uploadManuImage("uploads/manu", "manuImage"),
    async (req, res) => {
      const manu = req.file;
      // console.log(req.file);
      if(req.params._id){
        if (manu) {
          try {
            await Manufacturer.findByIdAndUpdate(req.params._id, {
              image: req.file.filename
            });
          } catch (err) {
            res.status(400).send("Manu update error");
          }
        }
        res.status(200).send({ message: "success", error: false });
      }else{
        res.status(400).send("Save Manu error");
      }
    }
  );
};
