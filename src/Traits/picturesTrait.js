const Picture = require("../models/pictureModel");
const Product = require("../models/productModel");
const { cloudinary } = require("../utils/cloudinary");

const getAllPictures = async () => {
  try {
    const pictures = await Picture.find();
    return { statusCode: 200, result: pictures };
  } catch (error) {
    throw error;
  }
};

const getOnePicture = async (id) => {
  try {
    const picture = await Picture.findById(id);
    if (!picture) return { statusCode: 400, result: "Picture not found." };
    return { statusCode: 200, result: picture };
  } catch (error) {
    throw error;
  }
};

const getProductGallery = async (isMainPicture, productId) => {
  try {
    const picture = await Picture.find({ productId, isMainPicture });
    if (!picture) return { statusCode: 400, result: "Picture not found." };
    return { statusCode: 200, result: picture };
  } catch (error) {
    throw error;
  }
};

const createPicture = async (body) => {
  try {
    const { productId, isMainPicture, path, alt, title } = body;
    if (!productId || isMainPicture === undefined || !path || !alt || !title)
      return {
        statusCode: 400,
        result:
          "Request body should have productId, isMainPicture, path, alt and title to create and upload a picture.",
      };
    const product = await Product.findById(productId);
    if (!product)
      return { statusCode: 400, result: "Could not find the chosen product." };
    const uploadedImage = await cloudinary.uploader.upload(path, {
      upload_preset: "ml_default",
    });

    if (isMainPicture) {
      const {
        name,
        categoryId,
        price,
        discount,
        inventory,
        description,
        specifications,
      } = product;
      await Product.findByIdAndUpdate(productId, {
        name,
        categoryId,
        price,
        discount,
        inventory,
        description,
        specifications,
        pictureSrc: uploadedImage.secure_url,
      });
    }
    let createdPicture = new Picture({
      productId,
      publicId: uploadedImage.public_id,
      isMainPicture,
      path: uploadedImage.secure_url,
      alt,
      title,
    });
    createdPicture = await createdPicture.save();
    return { statusCode: 200, result: createdPicture };
  } catch (error) {
    throw error;
  }
};

const updatePicture = async (id, body) => {
  try {
    const { productId, isMainPicture, path, alt, title } = body;
    const picture = await Picture.findById(id);
    if (!picture) return { statusCode: 400, result: "Picture not found." };
    if (!productId || !isMainPicture || !path || !alt || !title)
      return {
        statusCode: 400,
        result:
          "Request body should have productId, isMainPicture, path, alt and title to update a picture.",
      };
    const product = await Product.findById(productId);
    if (!product)
      return { statusCode: 400, result: "Could not find the chosen product." };
    await cloudinary.uploader.destroy(deletedPicture.publicId);
    const uploadedImage = await cloudinary.uploader.upload(path, {
      upload_preset: "ml_default",
    });
    const editedPicture = await Picture.findByIdAndUpdate(
      id,
      {
        productId,
        publicId: uploadedImage.public_id,
        isMainPicture,
        path: uploadedImage.secure_url,
        alt,
        title,
      },
      { new: true }
    );
    return { statusCode: 200, result: editedPicture };
  } catch (error) {
    throw error;
  }
};

const deletePicture = async (id) => {
  try {
    const deletedPicture = await Picture.findByIdAndRemove(id);
    if (!deletedPicture)
      return { statusCode: 400, result: "Picture not found." };
    await cloudinary.uploader.destroy(deletedPicture.publicId);
    return { statusCode: 200, result: deletedPicture };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllPictures,
  getOnePicture,
  getProductGallery,
  createPicture,
  updatePicture,
  deletePicture,
};
