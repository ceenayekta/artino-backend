const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 1000,
  },
  discount: {
    type: Number,
    min: 0,
    default: 0,
  },
  inventory: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    required: true,
    minlength: 20,
  },
  specifications: {
    type: String,
    required: true,
    minlength: 10,
  },
  pictureSrc: {
    type: String,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
