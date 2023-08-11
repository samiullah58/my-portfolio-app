const user = require("../routes/signup");
const auth = require("../routes/auth");
const project = require("../routes/project");
const express = require("express");
const app = express();

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/user", user);
  app.use("/api/auth", auth);
  app.use("/api/project", project);
};
