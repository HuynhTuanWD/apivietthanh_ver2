const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");
module.exports = roles => {
  return async (req, res, next) => {
    try {
      let token = req.headers["authorization"];
      console.log(req.headers);
      let jwt_user = jwt.verify(token, process.env.SECRET_KEY);
      let user = await User.findById(jwt_user.userId, "role");
      if (user.role) {
        if (roles.length == 0 || roles.indexOf(user.role) !== -1) {
          return next();
        }
      }
      return res.status(401).send({      
        error: true,
        message: "Vui lòng đăng nhập để thực hiện chức năng này!"
      });
      } catch (err) {
      return res.status(401).send({
        error: true,
        message: "Vui lòng đăng nhập để thực hiện chức năng này!"
      });
    }
  };
};
// chỗ find id thêm điều kiện isActive
