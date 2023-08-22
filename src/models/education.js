const mongoose = require("mongoose");
const Joi = require("joi");

const educationSchema = new mongoose.Schema({
  institutionName: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  fieldOfStudy: {
    type: String,
    required: true,
  },
  graduationYear: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Education = new mongoose.model("Education", educationSchema);

function validateEducation(education) {
  const schema = Joi.object({
    institutionName: Joi.string().required(),
    degree: Joi.string().required(),
    fieldOfStudy: Joi.string().required(),
    graduationYear: Joi.number().required(),
    description: Joi.string().required(),
  });
  return schema.validate(education);
}

module.exports.Education = Education;
module.exports.validate = validateEducation;
