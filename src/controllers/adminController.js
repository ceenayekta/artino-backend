const { loginAdmin, signupAdmin } = require("../Traits/adminTrait");

exports.login = async (req, res) => {
  try {
    const { statusCode, result } = await loginAdmin(req.body);
    return res.status(statusCode).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.signup = async (req, res) => {
  try {
    const { statusCode, result } = await signupAdmin(req.body);
    return res.status(statusCode).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};