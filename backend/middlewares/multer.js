const multer = require("multer");

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, Math.round(new Date() / 1000) + "--" + file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });

module.exports = { upload };