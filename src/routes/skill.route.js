const express = require("express");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const skillController = require("../controllers/skill.controller");

const router = express.Router();

router
  .route("/")
  .get(auth, skillController.getAllSkill)
  .post(auth, admin, skillController.createSkill);

router
  .route("/:id")
  .put(auth, admin, skillController.updateSkillById)
  .get(auth, skillController.getSkillById)
  .delete(auth, admin, skillController.deleteSkillById);

module.exports = router;
