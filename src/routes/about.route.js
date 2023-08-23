const express = require("express");
const aboutController = require("../controllers/about.controller");

const router = express.Router();

router
  .route("/")
  .get(aboutController.getAbout)
  .post(aboutController.createAbout);
router
  .route("/:id")
  .put(aboutController.updateAboutById)
  .get(aboutController.getAboutById)
  .delete(aboutController.deleteAboutById);

module.exports = router;
