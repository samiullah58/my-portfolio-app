const { User } = require("../model/signup");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).send("email or password is incorrect...!");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(404).send("email or password is incorrect...");

  const token = user.generateAuthToken();

  res.json({
    message: "User logged in successfuly",
    data: {
      _id: user._id,
      userName: user.userName,
      email: user.email,
      role: user.role,
    },
    token,
  });
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });
  return schema.validate(req);
}

module.exports = router;
