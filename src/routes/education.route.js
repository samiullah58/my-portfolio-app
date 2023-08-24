const express = require("express");
const educationController = require("../controllers/education.controller");

const router = express.Router();

router
  .route("/")
  .get(educationController.getAllEducation)
  .post(educationController.createEducation);

router
  .route("/:id")
  .put(educationController.updateEducation)
  .get(educationController.getEducationById)
  .delete(educationController.deleteEducationById);

module.exports = router;
