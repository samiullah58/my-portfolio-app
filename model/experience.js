const mongoose = require("mongoose");
const Joi = require("joi");

const experienceSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  employmentPeriod: {
    startDate: Date,
    endDate: Date,
  },
  description: {
    type: String,
    required: true,
  },
  responsibilities: {
    type: Array,
    required: true,
  },
});

const Experience = new mongoose.model("experience", experienceSchema);

function validateExperience(experience) {
  const schema = Joi.object({
    jobTitle: Joi.string().required(),
    companyName: Joi.string().required(),
    location: Joi.string().required(),
    employmentPeriod: Joi.object({
      startDate: Joi.date().iso().required(),
      endDate: Joi.date().iso().greater(Joi.ref("startDate")).allow(null),
    }).required(),
    description: Joi.string().required(),
    responsibilities: Joi.array().required(),
  });
  return schema.validate(experience);
}

module.exports.Experience = Experience;
module.exports.validate = validateExperience;
