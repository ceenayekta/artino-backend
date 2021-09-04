module.exports = function (req, res, next) {
  const token = req.header("Authorization");
  if (!token)
    return res.status(401).send("You are not allowed to make changes.");

  let result;
  try {
    result = jwt.verify(token, config.get("jwtPrivateKey"));
  } catch (error) {
    return res.status(400).send("You are not allowed to make changes.");
  }

  if (!result) {
    return res.send("error");
  }

  req.user = result;
  next();
};
