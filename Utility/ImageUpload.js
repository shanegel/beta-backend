const multer = require('multer');
const AppError = require('../Middlewares/AppError');
//const AsyncHandler = require('../Middlewares/AsyncHandler');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/Users/Public');
  },
  filename: (req, file, cb) => {
    const type = file.mimetype.split('/')[1];
    const name = file.originalname.split('.')[0];
    cb(null, `Project-${name}-${Date.now()}.${type}`);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image. Please select an image.', 403));
  }
};
const upload = multer({
  storage,
  fileFilter,
});

const uploadCover = upload.single('projectImage');
module.exports = uploadCover;
