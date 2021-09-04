const {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../Traits/productsTrait");

exports.retrieve = async (req, res) => {
  try {
    const { statusCode, result } = await getAllProducts();
    return res.status(statusCode).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.retrieveOne = async (req, res) => {
  try {
    const { id } = req.params;
    const { statusCode, result } = await getOneProduct(id);
    return res.status(statusCode).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.create = async (req, res) => {
  try {
    const { statusCode, result } = await createProduct(req.body);
    return res.status(statusCode).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { statusCode, result } = await updateProduct(id, req.body);
    return res.status(statusCode).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const { statusCode, result } = await deleteProduct(id);
    return res.status(statusCode).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
