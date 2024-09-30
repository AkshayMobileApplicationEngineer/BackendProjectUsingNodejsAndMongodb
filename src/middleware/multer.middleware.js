import multer from 'multer';

// Configure storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/temp');  // Destination folder for uploads
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Save the file with the original name
  }
});

// Create multer upload middleware
export const upload = multer({
  storage // Use the defined storage
  
});
