const express = require("express");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const educationController = require("../controllers/education.controller");

const router = express.Router();

router
  .route("/")
  .get(auth, educationController.getAllEducation)
  .post(auth, admin, educationController.createEducation);

router
  .route("/:id")
  .put(auth, admin, educationController.updateEducationById)
  .get(auth, educationController.getEducationById)
  .delete(auth, admin, educationController.deleteEducationById);

module.exports = router;
