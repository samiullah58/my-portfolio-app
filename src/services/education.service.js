const { Education, validate } = require("../models/education.model");
const ApiError = require("../utils/apiError");
const httpStatus = require("http-status");

const getAllEducation = async () => {
  const education = await Education.find();
  return education;
};

const createEducation = async (userBody) => {
  try {
    const { error } = validate(userBody);
    if (error) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Something is missing in the body."
      );
    }

    const {
      institutionName,
      degree,
      fieldOfStudy,
      graduationYear,
      description,
    } = userBody;

    const education = await new Education({
      institutionName: institutionName,
      degree: degree,
      fieldOfStudy: fieldOfStudy,
      graduationYear: graduationYear,
      description: description,
    });

    await education.save();
    return education;
  } catch (error) {
    throw new ApiError(
      error.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
};

const updateEducation = async (userId, userBody) => {
  try {
    const { error } = validate(userBody);
    if (error) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Something is missing in the body."
      );
    }

    const education = await Education.findByIdAndUpdate(
      userId,
      {
        institutionName: userBody.institutionName,
        degree: userBody.degree,
        fieldOfStudy: userBody.fieldOfStudy,
        graduationYear: userBody.graduationYear,
        description: userBody.description,
      },
      { new: true }
    );

    if (!education) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        "Education not found with the given id."
      );
    }
    return education;
  } catch (error) {
    throw new ApiError(
      error.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
};

const getEducationById = async (userId) => {
  const education = await Education.findById(userId);
  if (!education) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Education not found with the given id."
    );
  }
  return education;
};

const deleteEducationById = async (userId) => {
  const education = await Education.findByIdAndDelete(userId);
  if (!education) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Education not found with the given id."
    );
  }
  return education;
};

module.exports = {
  getAllEducation,
  createEducation,
  updateEducation,
  getEducationById,
  deleteEducationById,
};
