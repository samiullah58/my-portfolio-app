const { User, validate } = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const _ = require("lodash");
const express = require("express");
const router = express.Router();
router.use(express.json());

router.get("/", async (req, res) => {
  const user = await User.find();
  res.json({ data: user });
});

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser)
      return res.status(400).json({ message: "User already registered" });

    const user = new User({
      ..._.pick(req.body, ["userName", "email", "password"]),
      role: "user",
    });

    const hashedPassword = await user.createPassword(req.body.password);
    user.password = hashedPassword;

    const verificationToken = jwt.sign(
      { userId: user._id },
      process.env.SECRET_KEY,
      { expiresIn: process.env.EMAIL_VERIFY_TIME }
    );

    user.verificationToken = verificationToken;
    const expirationTimeInMilliseconds =
      parseInt(process.env.EMAIL_VERIFY_TIME) * 24 * 60 * 60 * 1000;

    user.verificationTokenExpiry = new Date(
      Date.now() + expirationTimeInMilliseconds
    );

    await user.save();

    // sending email verify token to the client
    const verificationLink = `http://localhost:3000/api/auth/verify/${verificationToken}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: "samiullahrashid4@gmail.com",
      subject: "Account Verification",
      text: `Please click the following link to verify your account: ${verificationLink}`,
    };
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        res.status(500).json({ error: "Error sending verification email." });
      } else {
        console.log("Email sent:", info.response);
        res.status(200).json({
          message: "User added successfully. Varification email sent.",
        });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
      },
      {
        new: true,
      }
    );
    if (!user) return res.status(404).send("User not found with the given id.");
    res.status(200).json({ message: "User updated successfuly" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send("User not found with the given id.");
  res.send(user);
});

router.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).send("User not found with the given id.");
  res.json({ message: "User deleted successfuly" });
});

module.exports = router;
