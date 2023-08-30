const user = require("../models/user.model");

module.exports = function (req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).send("Access denied.");
  }
  next();
};
