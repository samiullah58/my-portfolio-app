const express = require("express");
const skillController = require("../controllers/skill.controller");

const router = express.Router();

router
  .route("/")
  .get(skillController.getAllSkill)
  .post(skillController.createSkill);

router
  .route("/:id")
  .put(skillController.updateSkillById)
  .get(skillController.getSkillById)
  .delete(skillController.deleteSkillById);

module.exports = router;
