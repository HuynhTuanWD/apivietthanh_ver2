const mongoose = require("mongoose");
const Manufacturer = mongoose.model("manufacturers");
const { uploadManuImage } = require("../middlewares/uploadFile");
module.exports = app => {
  app.post("/api/manufacturer", async (req, res) => {
    const { name } = req.body;
    const manufacturer = new Manufacturer({
      name
    });
    try {
      await manufacturer.save();
      const _id = manufacturer._id;
      res.send({ _id });
    } catch (err) {
      res.status(400).send({ message: "bad request" });
    }
  });
  app.post(
    "/api/manufacturer/image",
    uploadManuImage("uploads/manu", "manuImage"),
    async (req, res) => {
      const manu = req.file;
      console.log(req.body._id);
      console.log(manu);
      if (!manu) {
        res.status(400).send("invalid image");
      } else {
        res.status(200).send({ message: "upload successful", error: false });
      }
    }
  );
};
