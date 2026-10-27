const path = require('path');
const crypto = require('crypto');
const multer = require('multer');

module.exports = multer({
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', '..', 'uploads'),
    filename: (req, file, cb) =>
      cb(null, `${Date.now()}-${crypto.randomBytes(4).toString('hex')}${path.extname(file.originalname).toLowerCase()}`),
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) =>
    /^image\/(png|jpe?g|webp|svg\+xml|gif)$/.test(file.mimetype)
      ? cb(null, true)
      : cb(new Error('Only image files are allowed')),
});
