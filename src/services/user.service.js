const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const _ = require("lodash");
const ApiError = require("../utils/apiError");
const httpStatus = require("http-status");

const getAllUser = async () => {
  return User.find();
};

const createUser = async (userBody) => {
  try {
    const { error } = validate(userBody);
    if (error) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Something is missing in the body."
      );
    }

    const existingUser = await User.findOne({ email: userBody.email });
    if (existingUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, "User already registered");
    }

    const user = new User({
      ..._.pick(userBody, ["userName", "email", "password"]),
      role: "user",
    });

    const hashedPassword = await user.createPassword(userBody.password);
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
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          "Error sending verification email."
        );
      } else {
        console.log("Email sent:", info.response);
      }
    });
    return true;
  } catch (error) {
    throw new ApiError(
      error.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
};

const updateUser = async (userId, userBody) => {
  try {
    const { error } = validate(userBody);
    if (error) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Something is missing in the body."
      );
    }

    if (userBody.password) {
      const salt = await bcrypt.genSalt(10);
      userBody.password = await bcrypt.hash(userBody.password, salt);
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        userName: userBody.userName,
        email: userBody.email,
        password: userBody.password,
      },
      {
        new: true,
      }
    );

    if (!user) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        "User not found with the given id."
      );
    }
    return true;
  } catch (error) {
    throw new ApiError(
      error.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
};

const getUserById = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "User not found with the given id."
    );
  }
  return user;
};

const deleteUserById = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "User not found with the given id."
    );
  }
};

module.exports = {
  getAllUser,
  createUser,
  updateUser,
  getUserById,
  deleteUserById,
};
