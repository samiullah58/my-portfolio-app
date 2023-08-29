const express = require("express");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const userController = require("../controllers/user.controller");

const router = express.Router();

router
  .route("/")
  .get(auth, admin, userController.getAllUser)
  .post(userController.createUser);

router
  .route("/:id")
  .put(userController.updateUserById)
  .get(userController.getUserById)
  .delete(auth, admin, userController.deleteUserById);

module.exports = router;
