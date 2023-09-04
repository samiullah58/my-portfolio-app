require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { faker } = require("@faker-js/faker");
const jwt = require("jsonwebtoken");
const { User } = require("../../src/models/user.model");

const password = "password1";
const salt = bcrypt.genSaltSync(10);
const hashPassword = bcrypt.hashSync(password, salt);

const userOne = {
  _id: new mongoose.Types.ObjectId(),
  userName: faker.person.fullName(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: "user",
  isVerified: false,
};

const userTwo = {
  _id: new mongoose.Types.ObjectId(),
  userName: faker.person.fullName(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: "user",
  isVerified: false,
};

const admin = {
  _id: new mongoose.Types.ObjectId(),
  userName: faker.person.fullName(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: "admin",
  isVerified: false,
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

module.exports = {
  userOne,
  userTwo,
  admin,
  insertUsers,
  token,
};
