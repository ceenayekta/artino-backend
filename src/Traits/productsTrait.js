const Category = require("../models/categoryModel");
const Product = require("../models/productModel");
const Picture = require("../models/pictureModel");
const { deletePicture } = require("./picturesTrait");

const getAllProducts = async () => {
  try {
    const products = await Product.find();
    return { statusCode: 200, result: products };
  } catch (error) {
    throw error;
  }
};

const getOneProduct = async (id) => {
  try {
    const product = await Product.findById(id);
    if (!product) return { statusCode: 400, result: "Product not found." };
    return { statusCode: 200, result: product };
  } catch (error) {
    throw error;
  }
};

const createProduct = async (body) => {
  try {
    const {
      categoryId,
      name,
      price,
      discount,
      inventory,
      description,
      specifications,
    } = body;
    if (
      !categoryId ||
      !name ||
      !price ||
      !inventory ||
      !description ||
      !specifications
    )
      return {
        statusCode: 400,
        result:
          "Request body should have categoryId, name, price, discount(optional), inventory, description and specifications to create a product.",
      };
    const category = await Category.findById(categoryId);
    if (!category)
      return { statusCode: 400, result: "Chosen category not found." };
    if (category.isMainCategory)
      return {
        statusCode: 400,
        result:
          "Main categories can not contain any product (only child categories can).",
      };
    if (parseInt(discount) > parseInt(price))
      return {
        statusCode: 400,
        result: "Discount can not be greater that price.",
      };
    let createdProduct = new Product({
      categoryId,
      name,
      price: parseInt(price),
      discount: parseInt(discount),
      inventory,
      description,
      specifications,
    });
    createdProduct = await createdProduct.save();
    return { statusCode: 200, result: createdProduct };
  } catch (error) {
    throw error;
  }
};

const updateProduct = async (id, body) => {
  try {
    const {
      categoryId,
      name,
      price,
      discount,
      inventory,
      description,
      specifications,
    } = body;
    const product = await Product.findById(id);
    if (!product) return { statusCode: 400, result: "Product not found." };
    if (
      !categoryId ||
      !name ||
      !price ||
      !inventory ||
      !description ||
      !specifications
    )
      return {
        statusCode: 400,
        result:
          "Request body should have categoryId, name, price, discount(optional), inventory, description and specifications to create a product.",
      };
    const category = await Category.findById(categoryId);
    if (!category)
      return { statusCode: 400, result: "Chosen category not found." };
    if (category.isMainCategory)
      return {
        statusCode: 400,
        result:
          "Main categories can not contain any product (only child categories can).",
      };
    if (discount > price)
      return {
        statusCode: 400,
        result: "Discount can not be greater that price.",
      };
    const editedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        categoryId,
        price,
        discount,
        inventory,
        description,
        specifications,
      },
      { new: true }
    );
    return { statusCode: 200, result: editedProduct };
  } catch (error) {
    throw error;
  }
};

const deleteProduct = async (id) => {
  try {
    const deletedProduct = await Product.findByIdAndRemove(id);
    if (!deletedProduct)
      return { statusCode: 400, result: "Product not found." };
    const deletedPictures = await Picture.find({
      productId: deletedProduct._id,
    });
    for (let i = 0; i < deletedPictures.length; i++) {
      const picture = deletedPictures[i];
      deletePicture(picture._id);
    }
    return { statusCode: 200, result: { deletedProduct, deletedPictures } };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
