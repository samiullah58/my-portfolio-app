const { Experience, validate } = require("../models/experience");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const express = require("express");
const ApiError = require("../utils/apiError");
const httpStatus = require("http-status");
const router = express.Router();

// router.get("/", auth, async (req, res) => {
//   const experience = await Experience.find();
//   res.json({ experience });
// });

const getAllExperience = async () => {
  const experience = await Experience.find();
  return experience;
};

// router.post("/", [auth, admin], async (req, res) => {
//   try {
//     const { error } = validate(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     const {
//       jobTitle,
//       companyName,
//       location,
//       employmentPeriod,
//       description,
//       responsibilities,
//     } = req.body;

//     const experience = await new Experience({
//       jobTitle: jobTitle,
//       companyName: companyName,
//       location: location,
//       employmentPeriod: employmentPeriod,
//       description: description,
//       responsibilities: responsibilities,
//     });

//     await experience.save();
//     res.json({ message: "Experience has been added successfuly." });
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error." });
//   }
// });

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

//     const experience = await Experience.findByIdAndUpdate(
//       req.params.id,
//       {
//         jobTitle: req.body.jobTitle,
//         companyName: req.body.companyName,
//         location: req.body.location,
//         employmentPeriod: req.body.employmentPeriod,
//         description: req.body.description,
//         responsibilities: req.body.responsibilities,
//       },
//       { new: true }
//     );
//     if (!experience)
//       return res
//         .status(404)
//         .json({ error: "Experience not found with the given id." });

//     res.json({ message: "Experience has been updated successfuly." });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error." });
//   }
// });

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
      httpStatus.INTERNAL_SERVER_ERROR,
      "Internal server error."
    );
    // console.log(error.message);
  }
};

// router.get("/:id", auth, async (req, res) => {
//   const experience = await Experience.findById(req.params.id);
//   if (!experience)
//     return res
//       .status(404)
//       .json({ error: "Experience not found with the given id." });
//   res.json({ experience });
// });

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

// router.delete("/:id", [auth, admin], async (req, res) => {
//   const experience = await Experience.findByIdAndDelete(req.params.id);
//   if (!experience)
//     return res
//       .status(404)
//       .json({ error: "Experience not found with the given id." });
//   res.json({ message: "Experience has been deleted successfuly." });
// });

// module.exports = router;

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
