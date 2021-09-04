const mongoose = require("mongoose");

const pictureSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  publicId: {
    type: String,
    required: true,
  },
  isMainPicture: {
    type: Boolean,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    minlength: 3,
    maxlength: 30,
    required: true,
  },
  title: {
    type: String,
    minlength: 3,
    maxlength: 30,
    required: true,
  },
});
const Picture = mongoose.model("Picture", pictureSchema);

module.exports = Picture;
