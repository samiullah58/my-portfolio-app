const jwt = require("jsonwebtoken");
// const User = require("../model/user");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).json({ message: "Token missing." });

  try {
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = verifyToken.userId;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.status(401).json({ message: "Token has expired." });
    } else {
      res.status(401).json({ message: "Invalid token." });
    }
  }
};

// function validateAuth(User) {
//   const schema = Joi.object({
//     email: Joi.string().required().email(),
//     password: Joi.string().required(),
//   });
//   return schema.validate(User);
// }

// module.exports = validateAuth;
module.exports = authMiddleware;
