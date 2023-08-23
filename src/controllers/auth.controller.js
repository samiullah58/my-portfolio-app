require("dotenv").config();
const { authService } = require("../services");

const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const tokens = await authService.userLogin({ email, password });
    res.json({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

const refreshToke = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const accessToken = await authService.refreshToken({ refreshToken });
    res.json({ accessToken });
  } catch (error) {
    next(error);
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
    next(error);
  }
};

const resetPasswordToken = async (req, res, next) => {
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
    next(error);
  }
};

const verifyToken = async (req, res, next) => {
  try {
    const verificationToken = req.params.token;
    const success = await authService.verifyToken(verificationToken);
    if (success) {
      res.json({ message: "Account verified successfully." });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userLogin,
  refreshToke,
  resetPassword,
  resetPasswordToken,
  verifyToken,
};
