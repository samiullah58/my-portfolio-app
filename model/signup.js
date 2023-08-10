const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
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

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      userName: this.userName,
      email: this.email,
      role: this.role,
    },
    process.env.JWTPRIVATEKEY
  );
  return token;
};

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
