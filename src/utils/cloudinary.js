require("dotenv").config();
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "ceencloud",
  api_key: "383758853456824",
  api_secret: "8w3hUGRc7IYG8JQxoLu-azr7oKs",
  secure: true,
});

module.exports = { cloudinary };
