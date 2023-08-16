const mongoose = require("mongoose");
const Joi = require("joi");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const Contact = new mongoose.model("contact", contactSchema);

function validateContact(contact) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    subject: Joi.string().required(),
    message: Joi.string().required(),
  });
  return schema.validate(contact);
}

module.exports.Contact = Contact;
module.exports.validate = validateContact;
