const { About, validate } = require("../models/about");
const httpStatus = require("http-status");
const ApiError = require("../utils/apiError");

const getAllAbout = async () => {
  return About.find();
};

const createAbout = async (aboutBody) => {
  try {
    const { error } = validate(aboutBody);
    if (error) return res.status(400).send(error.details[0].message);

    const {
      introduction,
      personalInformation,
      professionalSummary,
      hobbiesAndInterest,
    } = aboutBody;

    const about = await new About({
      introduction: introduction,
      personalInformation: personalInformation,
      professionalSummary: professionalSummary,
      hobbiesAndInterest: hobbiesAndInterest,
    });

    await about.save();
    return about;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};

const updateAboutById = async (aboutId, updateBody) => {
  try {
    const { error } = validate(updateBody);
    if (error) return res.status(400).send(error.details[0].message);

    const about = await About.findByIdAndUpdate(
      aboutId,
      {
        introduction: updateBody.introduction,
        personalInformation: updateBody.personalInformation,
        professionalSummary: updateBody.professionalSummary,
        hobbiesAndInterest: updateBody.hobbiesAndInterest,
      },
      { new: true }
    );
    if (!about)
      throw new ApiError(
        httpStatus.NOT_FOUND,
        "About not found with the given id."
      );
    return about;
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Internal server error."
    );
  }
};

const getAboutById = async (aboutId) => {
  const about = await About.findById(aboutId);
  if (!about) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "About not found with the given id."
    );
  }
  return about;
};

const deleteAboutById = async (aboutId) => {
  const about = await About.findByIdAndDelete(aboutId);
  if (!about) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "About not found with the given id."
    );
  }
  return about;
};

module.exports = {
  getAllAbout,
  createAbout,
  updateAboutById,
  getAboutById,
  deleteAboutById,
};
