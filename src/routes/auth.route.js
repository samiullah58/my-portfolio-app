const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.post("/login", authController.userLogin);
router.post("/refresh", authController.refreshToke);
router.post("/resetPassword", authController.resetPassword);
router.put("/resetPassword/:token", authController.resetPasswordToken);
router.get("/verify/:token", authController.verifyToken);

module.exports = router;
