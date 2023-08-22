const { authService } = require("../services");

const userLogin = async (req, res) => {
  const user = await authService.userLogin(req.body);
  res.json({ accessToken, refreshToken });
};

module.exports = {
  userLogin,
};
