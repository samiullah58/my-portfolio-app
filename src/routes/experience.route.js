const express = require("express");
const experienceController = require("../controllers/experience.controller");

const router = express.Router();

router
  .route("/")
  .get(experienceController.getAllExperience)
  .post(experienceController.createExperience);

router
  .route("/:id")
  .put(experienceController.updateExperienceById)
  .get(experienceController.getExperienceById)
  .delete(experienceController.deleteExperienceById);

module.exports = router;
