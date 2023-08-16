// const user = require("../model/signup");

module.exports = function (req, res, next) {
  if (!req.user.isAdmin)
    return res.status(403).send("Access denied not an Admin.");
  next();
};
