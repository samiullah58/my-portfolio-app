const express = require("express");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const projectController = require("../controllers/project.controller");

const router = express.Router();

router
  .route("/")
  .get(auth, projectController.getAllProject)
  .post(auth, admin, projectController.createProject);

router
  .route("/:id")
  .put(auth, admin, projectController.updateProjectById)
  .get(auth, projectController.getProjectById)
  .delete(auth, admin, projectController.deleteProjectById);

module.exports = router;
