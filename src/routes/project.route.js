const express = require("express");
const projectController = require("../controllers/project.controller");

const router = express.Router();

router
  .route("/")
  .get(projectController.getAllProject)
  .post(projectController.createProject);

router
  .route("/:id")
  .put(projectController.updateProjectById)
  .get(projectController.getProjectById)
  .delete(projectController.deleteProjectById);

module.exports = router;
