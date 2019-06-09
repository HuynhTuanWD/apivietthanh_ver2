const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require('dotenv').config();
mongoose.Promise = global.Promise;
const { MONGO_USERNAME, MONGO_PASSWORD } = process.env;
const stringConn = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0-4bass.mongodb.net/vietthanh?retryWrites=true&w=majority`;
mongoose
  .connect(stringConn, { useNewUrlParser: true })
  .then(() => {
    console.log("Connect to MongoDB successfully!");
  })
  .catch(() => {
    console.log("Connect to MongoDB fail!");
  });
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
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

const port = process.env.PORT || 3000;
// set port
app.listen(port, function() {
  console.log("Node app is running on port 3000");
});
module.exports = app;
