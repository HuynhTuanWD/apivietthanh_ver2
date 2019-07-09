const mongoose = require("mongoose");
const Color = mongoose.model("colors");
const _ = require("lodash");
module.exports = app => {
  app.post("/api/color", async (req, res) => {
    let color = new Color(req.body);
    try {
      await color.save();
      res.send(color);
    } catch (err) {
      res.status(400).send("invalid input");
    }
  });
  app.get("/api/colors", async (req, res) => {
    let colors = await Color.find();
    res.send(_.reverse(colors));
  });
  app.post("/api/colors/deletes", async (req, res) => {
    await Color.deleteMany();
  });
  app.put("/api/color/:_id", async (req, res) => {
    const { _id } = req.params;
    try {
      await Color.findByIdAndUpdate(_id, req.body);
      res.send("update success");
    } catch (err) {
      res.status(400).send("invalid color");
    }
  });
  app.delete("/api/color/:_id", async (req, res) => {
    const { _id } = req.params;
    try {
      await Color.findByIdAndRemove(_id);
      res.send("delete success");
    } catch (err) {
      res.status(400).send("invalid id");
    }
  });
};
