const mongoose = require("mongoose");
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
