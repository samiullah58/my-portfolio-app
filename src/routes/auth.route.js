const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.route("/").post(authController.userLogin);

module.exports = router;
