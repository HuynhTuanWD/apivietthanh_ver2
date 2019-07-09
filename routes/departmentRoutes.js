const mongoose = require("mongoose");
const Department = mongoose.model("departments");
const _ = require("lodash");
module.exports = app => {
  app.get("/api/departments", async (req, res) => {
    let departments = await Department.find();
    res.send(departments);
  });
  app.get("/api/department/:id", async (req, res) => {
    let _id = req.params.id;
    try {
      let department = await Department.findById(_id);
      res.send(department);
    } catch (err) {
      res.status(400).send("invalid id");
    }
  });
  app.post("/api/department", async (req, res) => {
    let department = new Department(req.body);
    try {
      await department.save();
      res.send(department);
    } catch (err) {
      res.status(400).send("invalid department");
    }
  });
  app.delete("/api/department/:id", async (req, res) => {
    let _id = req.params.id;
    try {
      await Department.findByIdAndRemove(_id);
      res.send("delete success");
    } catch (err) {
      res.status(400).send("invalid id");
    }
  });
};
