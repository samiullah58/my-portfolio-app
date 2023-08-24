const { User } = require("../models/user");
const Token = require("../models/token");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ApiError = require("../utils/apiError");
const httpStatus = require("http-status");

const userLogin = async (userBody) => {
  try {
    const { email, password } = userBody;

    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found.");
    }

    const isPassword = await user.validatePassword(password);
    if (!isPassword) {
      throw new ApiError(httpStatus.NOT_FOUND, "Invalid credentials.");
    }

    const refreshToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.SECRET_KEY,
      {
        expiresIn: process.env.REFRESH_EXPIRE_TIME,
      }
    );

    const accessToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.SECRET_KEY,
      {
        expiresIn: process.env.ACCESS_EXPIRE_TIME,
      }
    );

    const refreshTokenDocument = new Token({
      userId: user._id,
      role: user.role,
      tokenType: "refresh",
      tokenValue: refreshToken,
      expiry: new Date(
        Date.now() +
          parseInt(process.env.REFRESH_EXPIRE_TIME) * 24 * 60 * 60 * 1000
      ),
    });

    await refreshTokenDocument.save();

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  } catch (error) {
    throw new ApiError(
      error.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
};

const refreshToken = async (userBody) => {
  try {
    const { refreshToken } = userBody;
    if (!refreshToken) {
      throw new ApiError(httpStatus.NOT_FOUND, "1st Invalid refresh token.");
    }
    const newToken = jwt.verify(
      refreshToken,
      process.env.SECRET_KEY,
      async (err, decoded) => {
        if (err) {
          throw new ApiError(
            httpStatus.UNAUTHORIZED,
            "2nd Invalid refresh token."
          );
        }

        const user = await User.findById({ _id: decoded.userId });
        if (!user) {
          throw new ApiError(httpStatus.NOT_FOUND, "User not found.");
        }

        const newAccessToken = jwt.sign(
          { userId: user._id },
          process.env.SECRET_KEY,
          { expiresIn: process.env.ACCESS_EXPIRE_TIME }
        );
        return newAccessToken;
      }
    );
    return newToken;
  } catch (error) {
    throw new ApiError(
      error.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
};

const resetPassword = async (userBody) => {
  try {
    const { email } = userBody;
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        "User not found with the given email"
      );
    }

    const verificationToken = jwt.sign(
      { userId: user._id },
      process.env.SECRET_KEY,
      { expiresIn: process.env.RESET_PASSWORD_VERIFY_TIME }
    );

    const verificationLink = `http://localhost:3000/api/auth/resetPassword/${verificationToken}`;

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
      subject: "Reset Password Verification",
      text: `Please click the following link to reset your password: ${verificationLink}`,
    };
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          "Error sending verification email."
        );
      } else {
        console.log("Email sent:", info.response);
      }
    });
    return mailOptions;
  } catch (error) {
    throw new ApiError(
      error.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
};

const resetPasswordToken = async (userId, userBody) => {
  try {
    const verificationToken = userId;
    const decoded = jwt.verify(verificationToken, process.env.SECRET_KEY);

    const { newPassword, confirmNewPassword } = userBody;

    const user = await User.findById(decoded.userId);
    if (!user) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        "User not found with the given token."
      );
    }

    const currentTimeInSeconds = Math.floor(Date.now() / 1000);

    if (decoded.exp < currentTimeInSeconds) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "Verification token expired."
      );
    }

    const isPassword = await user.validatePassword(newPassword);
    if (isPassword) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "newPassword must be different from old password."
      );
    }

    const matchingPassword = newPassword !== confirmNewPassword;
    if (matchingPassword) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "newPassword and confirmNewPassword must be match"
      );
    }

    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = newHashedPassword;
    await user.save();

    return true;
  } catch (error) {
    throw new ApiError(
      error.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
};

const verifyToken = async (userId) => {
  try {
    const verificationToken = userId;

    const decoded = jwt.verify(verificationToken, process.env.SECRET_KEY);

    const user = await User.findById(decoded.userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found.");
    }

    if (user.verificationToken !== verificationToken) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Invalid verification token.");
    }

    const currentTimeInSeconds = Math.floor(Date.now() / 1000);

    if (decoded.exp < currentTimeInSeconds) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Verification token expired.");
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;

    await user.save();
    return true;
  } catch (error) {
    throw new ApiError(
      error.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
};

module.exports = {
  userLogin,
  refreshToken,
  resetPassword,
  resetPasswordToken,
  verifyToken,
};
