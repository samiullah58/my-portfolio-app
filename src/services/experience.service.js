const { Experience, validate } = require("../models/experience");
const ApiError = require("../utils/apiError");
const httpStatus = require("http-status");

const getAllExperience = async () => {
  const experience = await Experience.find();
  return experience;
};

const createExperience = async (userBody) => {
  try {
    const { error } = validate(userBody);
    if (error) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Something is missing in the body."
      );
    }

    const {
      jobTitle,
      companyName,
      location,
      employmentPeriod,
      description,
      responsibilities,
    } = userBody;

    const experience = await new Experience({
      jobTitle: jobTitle,
      companyName: companyName,
      location: location,
      employmentPeriod: employmentPeriod,
      description: description,
      responsibilities: responsibilities,
    });

    await experience.save();
    return experience;
  } catch (error) {
    throw new ApiError(
      error.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
};

const updateExperienceById = async (userId, userBody) => {
  try {
    const { error } = validate(userBody);
    if (error) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Something is missing in the body."
      );
    }

    const experience = await Experience.findByIdAndUpdate(
      userId,
      {
        jobTitle: userBody.jobTitle,
        companyName: userBody.companyName,
        location: userBody.location,
        employmentPeriod: userBody.employmentPeriod,
        description: userBody.description,
        responsibilities: userBody.responsibilities,
      },
      { new: true }
    );
    if (!experience) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        "Experience not found with the given id."
      );
    }
    return experience;
  } catch (error) {
    throw new ApiError(
      error.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
};

const getExperienceById = async (UserId) => {
  const experience = await Experience.findById(UserId);
  if (!experience) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Experience not found with the given id."
    );
  }
  return experience;
};

const deleteExperienceById = async (userId) => {
  const experience = await Experience.findByIdAndDelete(userId);
  if (!experience) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Experience not found with the given id."
    );
  }
  return experience;
};

module.exports = {
  getAllExperience,
  createExperience,
  updateExperienceById,
  getExperienceById,
  deleteExperienceById,
};
