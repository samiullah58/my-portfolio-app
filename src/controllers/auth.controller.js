require("dotenv").config();
const { NOT_FOUND } = require("http-status");
const { authService } = require("../services");
const httpStatus = require("http-status");

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const tokens = await authService.userLogin({ email, password });
    res.json({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const refreshToke = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const accessToken = await authService.refreshToken({ refreshToken });
    res.json({ accessToken });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const userPassword = await authService.resetPassword({ email });
    res.json({
      message: `Reset Password Varification link has been sent to ${userPassword.to}.`,
    });
  } catch (error) {
    if (error.statusCode === httpStatus.NOT_FOUND) {
      res.status(httpStatus.NOT_FOUND).json({ message: error.message });
    } else {
      next(error);
    }
  }
};

const resetPasswordToken = async (req, res) => {
  try {
    const verificationToken = req.params.token;
    const { newPassword, confirmNewPassword } = req.body;
    const success = await authService.resetPasswordToken(verificationToken, {
      newPassword,
      confirmNewPassword,
    });
    if (success) {
      res.json({ message: "everything is updated" });
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const verifyToken = async (req, res) => {
  try {
    const verificationToken = req.params.token;
    const success = await authService.verifyToken(verificationToken);
    if (success) {
      res.json({ message: "Account verified successfully." });
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

module.exports = {
  userLogin,
  refreshToke,
  resetPassword,
  resetPasswordToken,
  verifyToken,
};
