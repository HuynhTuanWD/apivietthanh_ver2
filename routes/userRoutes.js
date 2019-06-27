const mongoose = require("mongoose");
const User = mongoose.model("users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authUser = require("../middlewares/authUser");
const { uploadUserAvatar } = require("../middlewares/uploadFile");
const readCount = require("../global/readCount");
const path = require("path");
const jimp = require("jimp");
const DIR_USER_AVATAR = "uploads/avatar/";
module.exports = app => {
  app.post("/api/user", async (req, res) => {
    const { name, username, password } = req.body;
    const user = new User({
      name,
      username,
      password
    });
    try {
      await user.save();
      res.status(200).send(user);
      // res.status(200).send({ message: "Tạo tài khoản thành công", err: false });
    } catch (err) {
      res.status(422).send({ err });
    }
  });
  app.post("/api/user/signIn", async (req, res) => {
    const { username, password } = req.body;
    try {
      let user = await User.findOne({ username: username }, "_id password");
      if (user) {
        let isUser = bcrypt.compareSync(password, user.password);
        if (isUser) {
          let token = jwt.sign(
            {
              userId: user._id,
              exp: Math.floor(Date.now() / 1000) + 60 * 60 + 10000000
            },
            process.env.SECRET_KEY
          );
          return res
            .status(200)
            .send({ message: "Login success!", err: false, token });
        }
      }
    } catch (err) {
      return res.status(400).send(err);
    }
    return res.status(401).send({ message: "Login fail!", err: true });
  });
  app.get("/api/user/isLogin", authUser([1]), async (req, res) => {
    res.status(200).send({ err: false });
  });
  app.get("/api/user", async (req, res) => {
    let users = await User.find();
    res.send(users);
  });
  app.post("/api/user/delete",async(req,res)=>{
    await User.deleteMany();
  })
  app.post("/api/user/uploadAvatar", uploadUserAvatar("uploads/avatar", "avatar"), (req, res) => {
    const avatar = req.file;
    if (!avatar) {
      res.status(400).send("invalid image");
    } else {
      jimp.read(DIR_USER_AVATAR + avatar.filename, (err, ori) => {
        if (err) throw err;
        let path_avatar = path.parse(avatar.filename);
        let medium = path_avatar.name + "-medium" + path_avatar.ext;
        let small = path_avatar.name + "-small" + path_avatar.ext;
        ori
          .quality(100)
          .resize(256, 256)
          .write(DIR_USER_AVATAR + medium); // save
        ori
          .quality(100)
          .resize(60, 60)
          .write(DIR_USER_AVATAR + small); // save
      });
    }
    res.send(avatar);
  });
};
