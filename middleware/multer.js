const multer = require('multer');
const xssEscape = require('xss-escape');

var storage = multer.diskStorage({
    filename: function(req, file, cb) {
      var originalname = xssEscape(file.originalname);
      cb(null, originalname)
    }
});

const upload = multer({
    storage: storage
});

module.exports = upload;