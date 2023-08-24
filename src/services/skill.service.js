const { Skill, validate } = require("../models/skill");
const ApiError = require("../utils/apiError");
const httpStatus = require("http-status");

const getAllSkill = async () => {
  const skill = await Skill.find();
  return skill;
};

const createSkill = async (userBody) => {
  try {
    const { error } = validate(userBody);
    if (error) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Something is missing in the body."
      );
    }

    const { skillName, category, description, experienceLevel } = userBody;

    const skill = await new Skill({
      skillName: skillName,
      category: category,
      description: description,
      experienceLevel: experienceLevel,
    });

    await skill.save();
    return skill;
  } catch (error) {
    throw new ApiError(
      error.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
};

const updateSkillById = async (userId, userBody) => {
  try {
    const { error } = validate(userBody);
    if (error) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Something is missing in the body."
      );
    }

    const skill = await Skill.findByIdAndUpdate(
      userId,
      {
        skillName: userBody.skillName,
        category: userBody.category,
        description: userBody.description,
        experienceLevel: userBody.experienceLevel,
      },
      { new: true }
    );
    return skill;
  } catch (error) {
    throw new ApiError(
      error.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
};

const getSkillById = async (userId) => {
  const skill = await Skill.findById(userId);
  if (!skill) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Skill not found with the given id."
    );
  }
  return skill;
};

const deleteSkillById = async (userId) => {
  const skill = await Skill.findByIdAndDelete(userId);
  if (!skill) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Skill not found with the given id."
    );
  }
  return skill;
};

module.exports = {
  getAllSkill,
  createSkill,
  updateSkillById,
  getSkillById,
  deleteSkillById,
};
