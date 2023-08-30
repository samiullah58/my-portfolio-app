const { Project, validate } = require("../models/project.model");
const ApiError = require("../utils/apiError");
const httpStatus = require("http-status");

const getAllProject = async () => {
  const project = await Project.find();
  return project;
};

const createProject = async (userBody) => {
  try {
    const { error } = validate(userBody);
    if (error) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Something is missing in the body."
      );
    }

    const {
      title,
      description,
      technologiesUsed,
      images,
      projectUrl,
      gitHubUrl,
    } = userBody;

    const project = await new Project({
      title: title,
      description: description,
      technologiesUsed: technologiesUsed,
      images: images,
      projectUrl: projectUrl,
      gitHubUrl: gitHubUrl,
    });

    await project.save();
    return project;
  } catch (error) {
    throw new ApiError(
      error.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
};

const updateProjectById = async (userId, userBody) => {
  try {
    const { error } = validate(userBody);
    if (error) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Something is missing in the body."
      );
    }

    const project = await Project.findByIdAndUpdate(
      userId,
      {
        title: userBody.title,
        description: userBody.description,
        technologiesUsed: userBody.technologiesUsed,
        images: userBody.images,
        projectUrl: userBody.projectUrl,
        gitHubUrl: userBody.gitHubUrl,
      },
      { new: true }
    );

    if (!project) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        "Project not found with the given id."
      );
    }
    return project;
  } catch (error) {
    throw new ApiError(
      error.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
};

const getProjectById = async (userId) => {
  const project = await Project.findById(userId);
  if (!project) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Project not found with the given id."
    );
  }
  return project;
};

const deleteProjectById = async (userId) => {
  const project = await Project.findByIdAndDelete(userId);
  if (!project) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Project not found with the given id."
    );
  }
  return project;
};

module.exports = {
  getAllProject,
  createProject,
  updateProjectById,
  getProjectById,
  deleteProjectById,
};
