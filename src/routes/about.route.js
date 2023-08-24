const express = require("express");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const aboutController = require("../controllers/about.controller");

const router = express.Router();

router
  .route("/")
  .get(auth, aboutController.getAllAbout)
  .post(auth, admin, aboutController.createAbout);
router
  .route("/:id")
  .put(auth, admin, aboutController.updateAboutById)
  .get(auth, aboutController.getAboutById)
  .delete(auth, admin, aboutController.deleteAboutById);

module.exports = router;
