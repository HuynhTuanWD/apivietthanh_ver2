const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);
const bodyParser = require("body-parser");
// setup timezone
require("./configs/setupTimezone");

// load .env
require("dotenv").config();

mongoose.Promise = global.Promise;

// connect to mongoDB
require("./configs/mongoConnection");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// allow use folder uploads
app.use("/uploads", express.static("uploads"));

// allow origin *
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});

// default route
app.get("/", function(req, res) {
  return res.send({ error: true, message: "hello" });
});

// convert all schema to models
require("./models/Product");
require("./models/User");
require("./models/Manufacturer");
require("./models/Category");
require("./models/Color");
require("./models/Department");
// load all routes
require("./routes/productRoutes")(app);
require("./routes/userRoutes")(app);
require("./routes/manufacturerRoutes")(app);
require("./routes/categoryRoutes")(app);
require("./routes/colorRoutes")(app);
require("./routes/departmentRoutes")(app);
// set port
const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Node app is running on port 3000");
});
module.exports = app;
