require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const faker = require("faker");
const jwt = require("jsonwebtoken");
const User = require("../../src/models/user.model");

const password = "password1";
const salt = bcrypt.genSaltSync(10);
const hashPassword = bcrypt.hashSync(password, salt);

const userOne = {
  _id: mongoose.Types.ObjectId(),
  userName: faker.name.findName(),
  email: faker.internet.email().tolowerCase(),
  password,
  role: "user",
  isEmailVarified: false,
};

const userTwo = {
  _id: mongoose.Types.ObjectId(),
  userName: faker.name.findName(),
  email: faker.internet.email().tolowerCase(),
  password,
  role: "user",
  isEmailVarified: false,
};

const admin = {
  _id: mongoose.Types.ObjectId(),
  userName: faker.name.findName(),
  email: faker.internet.email().tolowerCase(),
  password,
  role: "admin",
  isEmailVarified: false,
};

const insertUsers = async (users) => {
  await User.insertMany(
    users.map((user) => ({ ...user, password: hashPassword }))
  );
};

const token = jwt.sign(
  { userId: User._id, role: User.role },
  process.env.SECRET_KEY,
  {
    expiresIn: process.env.ACCESS_EXPIRE_TIME,
  }
);

const accessToken = jwt.verify(token, process.env.SECRET_KEY, async (err) => {
  if (err) {
    console.error(err);
  }
});

module.exports = {
  userOne,
  userTwo,
  admin,
  insertUsers,
  accessToken,
};
