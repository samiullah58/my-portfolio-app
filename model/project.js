const mongoose = require("mongoose");
const Joi = require("joi");
const { sortedIndexOf } = require("lodash");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    technologiesUsed: [String],
    images: {
      type: String,
      required: true,
    },
    projectUrl: {
      type: String,
      required: true,
    },
    gitHubUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Project = new mongoose.model("Project", projectSchema);

function validateProject(project) {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    technologiesUsed: Joi.array().required(),
    images: Joi.string().required(),
    projectUrl: Joi.string().required(),
    gitHubUrl: Joi.string().required(),
  });
  return schema.validate(project);
}

module.exports.Project = Project;
module.exports.validate = validateProject;
