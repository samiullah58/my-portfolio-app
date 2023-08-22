const { About, validate } = require("../models/about");
const httpStatus = require("http-status");
const ApiError = require("../utils/apiError");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const express = require("express");
const router = express.Router();

// router.get("/", auth, async (req, res) => {
//   const about = await About.find();
//   res.json({ about });
// });

const getAllAbout = async () => {
  return About.find();
};

// router.post("/", [auth, admin], async (req, res) => {
//   try {
//     const { error } = validate(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     const {
//       introduction,
//       personalInformation,
//       professionalSummary,
//       hobbiesAndInterest,
//     } = req.body;

//     const about = await new About({
//       introduction: introduction,
//       personalInformation: personalInformation,
//       professionalSummary: professionalSummary,
//       hobbiesAndInterest: hobbiesAndInterest,
//     });

//     await about.save();
//     res.json({ message: "About has been added successfuly." });
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error." });
//   }
// });

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

// router.put("/:id", [auth, admin], async (req, res) => {
//   try {
//     const { error } = validate(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     const about = await About.findByIdAndUpdate(
//       req.params.id,
//       {
//         introduction: req.body.introduction,
//         personalInformation: req.body.personalInformation,
//         professionalSummary: req.body.professionalSummary,
//         hobbiesAndInterest: req.body.hobbiesAndInterest,
//       },
//       { new: true }
//     );
//     if (!about)
//       return res
//         .status(404)
//         .json({ error: "About not found with the given id." });

//     res.json({ message: "About has been updated successfuly." });
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error." });
//   }
// });

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

// router.get("/:id", auth, async (req, res) => {
//   const about = await About.findById(req.params.id);
//   if (!about)
//     return res
//       .status(404)
//       .json({ error: "About not found with the given id." });
//   res.json({ about });
// });

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

// router.delete("/:id", [auth, admin], async (req, res) => {
//   const about = await About.findByIdAndDelete(req.params.id);
//   if (!about)
//     return res
//       .status(404)
//       .json({ error: "About not found with the given id." });
//   res.json({ message: "About has been deleted successfuly." });
// });

// module.exports = router;

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
