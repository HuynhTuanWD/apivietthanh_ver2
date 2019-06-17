const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
// setup timezone
require("./configs/setupTimezone");

// load .env
require("dotenv").config();

mongoose.Promise = global.Promise;

// connect to mongoDB
require("./configs/mongoConnection");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// use session
app.use(
  session({
    secret: "BanhMiphaicopate",
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
  })
);

// allow origin *
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// default route
app.get("/", function(req, res) {
  return res.send({ error: true, message: "hello" });
});

// convert all schema to models
require("./models/Product");
// load all routes
require("./routes/productRoutes")(app);

// set port
const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Node app is running on port 3000");
});
module.exports = app;
