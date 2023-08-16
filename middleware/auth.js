const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied not valide toekn!");

  try {
    const decodded = jwt.verify(token, process.env.JWTPRIVATEKEY);

    req.user = decodded;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token." });
  }
};
