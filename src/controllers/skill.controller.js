const { skillService } = require("../services/index");

const getAllSkill = async (req, res) => {
  try {
    const skill = await skillService.getAllSkill();
    if (skill) {
      res.json({ skill });
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const createSkill = async (req, res, next) => {
  try {
    const skill = await skillService.createSkill(req.body);
    if (skill) {
      res.json({ message: "Skill added successfuly." });
    }
  } catch (error) {
    // next(error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const updateSkillById = async (req, res, next) => {
  try {
    const skill = await skillService.updateSkillById(req.params.id, req.body);
    if (skill) {
      res.json({ message: "Skill has been updated successfuly." });
    }
  } catch (error) {
    // next(error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const getSkillById = async (req, res) => {
  try {
    const skill = await skillService.getSkillById(req.params.id);
    if (skill) {
      res.send(skill);
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const deleteSkillById = async (req, res) => {
  try {
    const skill = await skillService.deleteSkillById(req.params.id);
    if (skill) {
      res.json({ message: "Skill deleted successfuly." });
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

module.exports = {
  getAllSkill,
  createSkill,
  updateSkillById,
  getSkillById,
  deleteSkillById,
};
