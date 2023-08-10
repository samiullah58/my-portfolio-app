const user = require("../routes/signup");
const express = require("express");
const app = express();

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/user", user);
};
