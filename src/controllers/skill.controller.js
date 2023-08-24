const { skillService } = require("../services/index");

const getAllSkill = async (req, res) => {
  const skill = await skillService.getAllSkill();
  if (skill) {
    res.json({ skill });
  }
};

const createSkill = async (req, res, next) => {
  try {
    const skill = await skillService.createSkill(req.body);
    if (skill) {
      res.json({ message: "Skill added successfuly." });
    }
  } catch (error) {
    next(error);
  }
};

const updateSkillById = async (req, res, next) => {
  try {
    const skill = await skillService.updateSkillById(req.params.id, req.body);
    if (skill) {
      res.json({ message: "Skill has been updated successfuly." });
    }
  } catch (error) {
    next(error);
  }
};

const getSkillById = async (req, res) => {
  const skill = await skillService.getSkillById(req.params.id);
  if (skill) {
    res.send(skill);
  }
};

const deleteSkillById = async (req, res) => {
  const skill = await skillService.deleteSkillById(req.params.id);
  if (skill) {
    res.json({ message: "Skill deleted successfuly." });
  }
};

module.exports = {
  getAllSkill,
  createSkill,
  updateSkillById,
  getSkillById,
  deleteSkillById,
};
