const httpStatus = require("http-status");
const { About, validate } = require("../models/about");
const { aboutService } = require("../services");
const ApiError = require("../utils/apiError");

const getAbout = async (req, res) => {
  const about = await aboutService.getAllAbout();
  if (!about) {
    res.status(404).json({ message: "about not found." });
  }
  res.json({ about });
};

const createAbout = async (req, res) => {
  const about = await aboutService.createAbout(req.body);
  res.json({ message: "About has been added successfuly." });
};

const updateAboutById = async (req, res) => {
  const about = await aboutService.updateAboutById(
    req.params.aboutId,
    req.body
  );
  if (!about) {
    throw new ApiError(httpStatus.NOT_FOUND, "not found");
  }
  res.json({
    message: "About has been updated successfuly.",
  });
};

const getAboutById = async (req, res) => {
  const about = await aboutService.getAboutById(req.params.id);
  res.json({ about });
};

const deleteAboutById = async (req, res) => {
  const about = await aboutService.deleteAboutById(req.params.aboutId);
  res.json({ message: "About has been deleted successfuly." });
};

module.exports = {
  getAbout,
  createAbout,
  updateAboutById,
  getAboutById,
  deleteAboutById,
};
