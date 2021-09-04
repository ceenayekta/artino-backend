const {
  getAllPictures,
  getOnePicture,
  createPicture,
  updatePicture,
  deletePicture,
  getProductGallery,
} = require("../Traits/picturesTrait");

exports.retrieve = async (req, res) => {
  try {
    const { statusCode, result } = await getAllPictures();
    return res.status(statusCode).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.retrieveOne = async (req, res) => {
  try {
    const { id } = req.params;
    const { statusCode, result } = await getOnePicture(id);
    return res.status(statusCode).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.retrieveGallery = async (req, res) => {
  try {
    const { isMainPicture, productId } = req.params;
    const { statusCode, result } = await getProductGallery(
      isMainPicture,
      productId
    );
    return res.status(statusCode).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.create = async (req, res) => {
  try {
    const { statusCode, result } = await createPicture(req.body);
    return res.status(statusCode).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { statusCode, result } = await updatePicture(id, req.body);
    return res.status(statusCode).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const { statusCode, result } = await deletePicture(id);
    return res.status(statusCode).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
