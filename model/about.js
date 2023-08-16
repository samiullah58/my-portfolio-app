const mongoose = require("mongoose");
const Joi = require("joi");

const aboutSchema = new mongoose.Schema({
  introduction: {
    type: String,
    required: true,
  },
  personalInformation: {
    name: String,
    location: String,
    email: {
      type: String,
      unique: true,
    },
  },
  professionalSummary: {
    type: String,
    required: true,
  },
  hobbiesAndInterest: {
    type: String,
    required: true,
  },
});

const About = new mongoose.model("about", aboutSchema);

function validateAbout(about) {
  const schema = Joi.object({
    introduction: Joi.string().required(),
    personalInformation: Joi.object({
      name: Joi.string(),
      location: Joi.string(),
      email: Joi.string().email(),
    }).required(),
    professionalSummary: Joi.string().required(),
    hobbiesAndInterest: Joi.string().required(),
  });
  return schema.validate(about);
}

module.exports.About = About;
module.exports.validate = validateAbout;
