const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const _ = require("lodash");
const ApiError = require("../utils/apiError");
const httpStatus = require("http-status");

// router.get("/", async (req, res) => {
//   const user = await User.find();
//   res.json({ data: user });
// });

const getAllUser = async () => {
  return User.find();
};

// router.post("/", async (req, res) => {
//   try {
//     const { error } = validate(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     const existingUser = await User.findOne({ email: req.body.email });
//     if (existingUser)
//       return res.status(400).json({ message: "User already registered" });

//     const user = new User({
//       ..._.pick(req.body, ["userName", "email", "password"]),
//       role: "user",
//     });

//     const hashedPassword = await user.createPassword(req.body.password);
//     user.password = hashedPassword;

//     const verificationToken = jwt.sign(
//       { userId: user._id },
//       process.env.SECRET_KEY,
//       { expiresIn: process.env.EMAIL_VERIFY_TIME }
//     );

//     user.verificationToken = verificationToken;
//     const expirationTimeInMilliseconds =
//       parseInt(process.env.EMAIL_VERIFY_TIME) * 24 * 60 * 60 * 1000;

//     user.verificationTokenExpiry = new Date(
//       Date.now() + expirationTimeInMilliseconds
//     );

//     await user.save();

//     // sending email verify token to the client
//     const verificationLink = `http://localhost:3000/api/auth/verify/${verificationToken}`;

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_ADDRESS,
//         pass: process.env.EMAIL_PASSWORD,
//       },
//     });

//     const mailOptions = {
//       from: process.env.EMAIL_ADDRESS,
//       to: "samiullahrashid4@gmail.com",
//       subject: "Account Verification",
//       text: `Please click the following link to verify your account: ${verificationLink}`,
//     };
//     transporter.sendMail(mailOptions, function (err, info) {
//       if (err) {
//         res.status(500).json({ error: "Error sending verification email." });
//       } else {
//         console.log("Email sent:", info.response);
//         res.status(200).json({
//           message: "User added successfully. Varification email sent.",
//         });
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

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
      httpStatus.INTERNAL_SERVER_ERROR,
      "Internal server error."
    );
  }
};

// router.put("/:id", async (req, res) => {
//   try {
//     const { error } = validate(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     if (req.body.password) {
//       const salt = await bcrypt.genSalt(10);
//       req.body.password = await bcrypt.hash(req.body.password, salt);
//     }

//     const user = await User.findByIdAndUpdate(
//       req.params.id,
//       {
//         userName: req.body.userName,
//         email: req.body.email,
//         password: req.body.password,
//       },
//       {
//         new: true,
//       }
//     );
//     if (!user) return res.status(404).send("User not found with the given id.");
//     res.status(200).json({ message: "User updated successfuly" });
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

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
      httpStatus.INTERNAL_SERVER_ERROR,
      "Internal server error."
    );
  }
};

// router.get("/:id", async (req, res) => {
//   const user = await User.findById(req.params.id);
//   if (!user) return res.status(404).send("User not found with the given id.");
//   res.send(user);
// });

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

// router.delete("/:id", async (req, res) => {
//   const user = await User.findByIdAndDelete(req.params.id);
//   if (!user) return res.status(404).send("User not found with the given id.");
//   res.json({ message: "User deleted successfuly" });
// });

const deleteUserById = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) return res.status(404).send("User not found with the given id.");
};

// module.exports = router;
module.exports = {
  getAllUser,
  createUser,
  updateUser,
  getUserById,
  deleteUserById,
};
