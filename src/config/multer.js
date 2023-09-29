// config/multer.js

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'storage/images/'); // Set the destination folder for uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Use a unique name for each uploaded file
  },
});

const upload = multer({ storage });

module.exports = upload;
