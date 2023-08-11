const mongoose = require("mongoose");
const Joi = require("joi");

const skillSchema = new mongoose.Schema({
  skillName: {
    type: String,
    required: true,
  },
  category: [String],
  description: {
    type: String,
    require: true,
  },
  experienceLevel: {
    type: String,
    required: true,
  },
});

const Skill = new mongoose.model("Skill", skillSchema);

function validateSkillSchema(skill) {
  const schema = Joi.object({
    skillName: Joi.string().required(),
    category: Joi.array().required(),
    description: Joi.string().required(),
    experienceLevel: Joi.string().required(),
  });
  return schema.validate(skill);
}

module.exports.Skill = Skill;
module.exports.validate = validateSkillSchema;
