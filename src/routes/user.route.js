const express = require("express");
const userController = require("../controllers/user.controller");

const router = express.Router();

router
  .route("/")
  .get(userController.getAllUser)
  .post(userController.createUser);

router
  .route("/:id")
  .put(userController.updateUser)
  .get(userController.getUserById)
  .delete(userController.deleteUserById);

module.exports = router;
