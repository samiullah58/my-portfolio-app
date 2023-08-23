const express = require("express");
const contactController = require("../controllers/contact.controller");

const router = express.Router();

router.route("/").get(contactController.getAllContact);

module.exports = router;
