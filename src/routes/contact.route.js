const express = require("express");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const contactController = require("../controllers/contact.controller");

const router = express.Router();

router
  .route("/")
  .get(auth, contactController.getAllContact)
  .post(auth, admin, contactController.createContact);

router
  .route("/:id")
  .put(auth, admin, contactController.updateContactById)
  .get(auth, contactController.getContactById)
  .delete(auth, admin, contactController.deleteContactById);

module.exports = router;
