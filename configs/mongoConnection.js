const mongoose = require("mongoose");
const { MONGO_USERNAME, MONGO_PASSWORD } = process.env;
// const stringConn = `mongodb+srv://vietthanh:${MONGO_PASSWORD}@cluster0-4bass.mongodb.net/test?retryWrites=true`;
const stringConn = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@45.124.87.38/vietthanh`;
// console.log(MONGO_PASSWORD);
mongoose
  .connect(stringConn, { useNewUrlParser: true })
  .then(() => {
    console.log("Connect to MongoDB successfully!");
  })
  .catch((err) => {
    console.log(err);
  });
