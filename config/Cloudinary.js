const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

const setupCloudinary = (foldername) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: foldername,
      allowed_formats: ["jpg", "jpeg", "png", "webp", "svg"],
      public_id: (req, file) => `${foldername}-${Date.now()}`,
    },
  });

  return multer({ storage: storage });
};

module.exports = setupCloudinary;