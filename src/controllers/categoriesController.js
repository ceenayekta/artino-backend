const {
  getAllCategories,
  getOneCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../Traits/categoriesTrait");

exports.retrieve = async (req, res) => {
  try {
    const { statusCode, result } = await getAllCategories();
    return res.status(statusCode).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.retrieveOne = async (req, res) => {
  try {
    const { id } = req.params;
    const { statusCode, result } = await getOneCategory(id);
    return res.status(statusCode).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.create = async (req, res) => {
  try {
    const { statusCode, result } = await createCategory(req.body);
    return res.status(statusCode).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { statusCode, result } = await updateCategory(id, req.body);
    return res.status(statusCode).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const { statusCode, result } = await deleteCategory(id);
    return res.status(statusCode).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};
