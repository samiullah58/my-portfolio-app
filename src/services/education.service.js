const { Education, validate } = require("../models/education");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const ApiError = require("../utils/apiError");
const httpStatus = require("http-status");

// router.get("/", auth, async (req, res) => {
//   const education = await Education.find();
//   res.json({ education });
// });

const getAllEducation = async () => {
  const education = await Education.find();
  return education;
};

// router.post("/", [auth, admin], async (req, res) => {
//   try {
//     const { error } = validate(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     const {
//       institutionName,
//       degree,
//       fieldOfStudy,
//       graduationYear,
//       description,
//     } = req.body;

//     const education = await new Education({
//       institutionName: institutionName,
//       degree: degree,
//       fieldOfStudy: fieldOfStudy,
//       graduationYear: graduationYear,
//       description: description,
//     });

//     await education.save();
//     res.json({ message: "Education has been added successfuly." });
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error." });
//   }
// });

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
      httpStatus.INTERNAL_SERVER_ERROR,
      "Internal server error."
    );
  }
};

// router.put("/:id", [auth, admin], async (req, res) => {
//   try {
//     const { error } = validate(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     const education = await Education.findByIdAndUpdate(
//       req.params.id,
//       {
//         institutionName: req.body.institutionName,
//         degree: req.body.degree,
//         fieldOfStudy: req.body.fieldOfStudy,
//         graduationYear: req.body.graduationYear,
//         description: req.body.description,
//       },
//       { new: true }
//     );

//     if (!education)
//       return res
//         .status(404)
//         .json({ error: "Education not found with the given id." });
//     res.json({ message: "Education has been updated successfuly." });
//   } catch (error) {
//     res.json({ error: "Internal server error." });
//   }
// });

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
      httpStatus.INTERNAL_SERVER_ERROR,
      "Internal server error."
    );
  }
};

// router.get("/:id", auth, async (req, res) => {
//   const education = await Education.findById(req.params.id);
//   if (!education)
//     return res
//       .status(404)
//       .json({ error: "Education not found with the given id." });
//   res.send(education);
// });

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

// router.delete("/:id", [auth, admin], async (req, res) => {
//   const education = await Education.findByIdAndDelete(req.params.id);
//   if (!education)
//     return res
//       .status(404)
//       .json({ error: "Education not found with the given id." });
//   res.json({ message: "Education has been deleted successfuly." });
// });
// module.exports = router;

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
