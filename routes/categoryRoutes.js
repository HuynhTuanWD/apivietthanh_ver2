const mongoose = require("mongoose");
const Category = mongoose.model("categories");
module.exports = app => {
  app.post("/api/category", async (req, res) => {
    const { title } = req.body;
    let category = new Category({
      title
    });
    await category.save();
    res.status(200).send(category._id);
  });
  app.put("/api/categories", async (req, res) => {
    const { _id } = req.body;
    await Category.findByIdAndUpdate(_id);
    res.status(200).send();
  });
  app.get("/api/categories", async (req, res) => {
    let categories = await Category.find();
    res.status(200).send(categories);
  });
  app.post("/api/categories/deletes", async (req, res) => {
    const { category_ids } = req.body;
    await Category.deleteMany({ _id: { $in: category_ids } });
    res.status(200).send("delete success");
  });
  app.delete("/api/categories", async (req, res) => {
    const { category_ids } = req.body;
    console.log(req.body);
    console.log(category_ids);
    await Category.deleteMany({ _id: { $in: category_ids } });
    res.status(200).send("delete success");
  });
};