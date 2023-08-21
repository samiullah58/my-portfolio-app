require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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
  verificationToken: String,
  verificationTokenExpiry: Date,
  isVerified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
  },
});

userSchema.methods.createPassword = async function (plainTextPassword) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(plainTextPassword, salt);
};

userSchema.methods.validatePassword = async function (condidatePassword) {
  return await bcrypt.compare(condidatePassword, this.password);
};

const User = new mongoose.model("User", userSchema);

function validationUser(user) {
  const schema = Joi.object({
    userName: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });
  return schema.validate(user);
}

module.exports.User = User;
module.exports.validate = validationUser;
