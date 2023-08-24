const express = require("express");
const contactController = require("../controllers/contact.controller");

const router = express.Router();

router
  .route("/")
  .get(contactController.getAllContact)
  .post(contactController.createContact);

router
  .route("/:id")
  .put(contactController.updateContact)
  .get(contactController.getContactById)
  .delete(contactController.deleteContactById);

module.exports = router;
