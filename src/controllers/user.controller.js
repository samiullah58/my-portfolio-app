const httpStatus = require("http-status");
const { userService } = require("../services");
const ApiError = require("../utils/apiError");

const getAllUser = async (req, res) => {
  const user = await userService.getAllUser();
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found.");
  }
  res.json({ user });
};

const createUser = async (req, res, next) => {
  try {
    const success = await userService.createUser(req.body);
    if (success) {
      res.json({
        message: "User added successfully. Varification email sent.",
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    if (user) {
      res.json({ message: "User updated successfuly" });
    }
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  res.json({ user });
};

const deleteUserById = async (req, res) => {
  const user = await userService.deleteUserById(req.params.id);
  res.json({ message: "User deleted successfully." });
};

module.exports = {
  getAllUser,
  createUser,
  updateUser,
  getUserById,
  deleteUserById,
};
