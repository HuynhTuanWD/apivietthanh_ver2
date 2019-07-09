const multer = require("multer");
const path = require("path");
const readCount = require("../global/readCount");
uploadOne = (dir, name) => {
  let storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, dir);
    },
    filename: function(req, file, cb) {
      let path_file = path.parse(file.originalname);
      let filename = path_file.name+'-'+readCount()+path_file.ext;
      cb(null, filename);
    }
  });
  let upload = multer({ storage: storage });
  return upload.single(name);
};
uploadArray = (dir, name, limit) => {
  let storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, dir);
    },
    filename: function(req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now());
    }
  });
  let upload = multer({ storage: storage });
  return upload.array(name, limit);
};
module.exports = {
  uploadUserAvatar: uploadOne,
  uploadManuImage: uploadOne,
  uploadProductImage: uploadOne
};
