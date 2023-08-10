const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
  },
});

const User = new mongoose.model("User", userSchema);

function validationUser(user) {
  const schema = Joi.object({
    userName: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .label("confirmPassword")
      .messages({
        "any.only": "{{#label}} does not match the password",
      }),
    role: Joi.string(),
  });
  return schema.validate(user);
}

module.exports.User = User;
module.exports.validate = validationUser;
