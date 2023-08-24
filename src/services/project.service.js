const { Project, validate } = require("../models/project");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const express = require("express");
const ApiError = require("../utils/apiError");
const httpStatus = require("http-status");
const router = express.Router();

// router.get("/", auth, async (req, res) => {
//   const project = await Project.find();
//   res.json({ project });
// });

const getAllProject = async () => {
  const project = await Project.find();
  return project;
};

// router.post("/", [auth, admin], async (req, res) => {
//   try {
//     const { error } = validate(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     const {
//       title,
//       description,
//       technologiesUsed,
//       images,
//       projectUrl,
//       gitHubUrl,
//     } = req.body;

//     const project = await new Project({
//       title: title,
//       description: description,
//       technologiesUsed: technologiesUsed,
//       images: images,
//       projectUrl: projectUrl,
//       gitHubUrl: gitHubUrl,
//     });

//     await project.save();
//     res.json({ message: "Project added successfuly." });
//   } catch (error) {
//     res.json({ error: "Internal server error." });
//   }
// });

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
      httpStatus.INTERNAL_SERVER_ERROR,
      "Internal server error."
    );
    // console.log(error.message);
  }
};

// router.put("/:id", [auth, admin], async (req, res) => {
//   try {
//     const { error } = validate(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     const project = await Project.findByIdAndUpdate(
//       req.params.id,
//       {
//         title: req.body.title,
//         description: req.body.description,
//         technologiesUsed: req.body.technologiesUsed,
//         images: req.body.images,
//         projectUrl: req.body.projectUrl,
//         gitHubUrl: req.body.gitHubUrl,
//       },
//       { new: true }
//     );

//     if (!project) {
//       return res
//         .status(404)
//         .json({ error: "Project not found with the given id." });
//     }

//     res.json({ message: "Project updated successfuly." });
//   } catch (error) {
//     res.json({ error: "Internal server error." });
//   }
// });

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
      httpStatus.INTERNAL_SERVER_ERROR,
      "Internal server error."
    );
    // console.log(error.message);
  }
};

// router.get("/:id", auth, async (req, res) => {
//   const project = await Project.findById(req.params.id);
//   if (!project)
//     return res
//       .status(404)
//       .json({ error: "Project not found with the given id." });
//   res.send(project);
// });

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

// router.delete("/:id", [auth, admin], async (req, res) => {
//   const project = await Project.findByIdAndDelete(req.params.id);
//   if (!project)
//     return res
//       .status(404)
//       .json({ error: "Project not found with the given idd." });
//   res.json({ message: "Project deleted successfuly." });
// });

// module.exports = router;

const deleteProjectById = async (userId) => {
  const project = await Project.findByIdAndDelete(userId);
  if (!project) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Project not found with the given idd."
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
