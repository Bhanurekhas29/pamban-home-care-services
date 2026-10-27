const multer = require('multer');

// the file is kept in memory just long enough for the route to store it in the database
module.exports = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) =>
    /^image\/(png|jpe?g|webp|svg\+xml|gif)$/.test(file.mimetype)
      ? cb(null, true)
      : cb(new Error('Only image files are allowed')),
});
