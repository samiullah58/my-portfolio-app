const user = require("../model/user");

module.exports = function (req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).send("Access denied.");
  }
  next();
};
