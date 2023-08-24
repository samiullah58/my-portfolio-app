const { Skill, validate } = require("../models/skill");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/auth");
const express = require("express");
const ApiError = require("../utils/apiError");
const httpStatus = require("http-status");
const router = express.Router();

// router.get("/", auth, async (req, res) => {
//   const skill = await Skill.find();
//   res.json({ data: skill });
// });

const getAllSkill = async () => {
  const skill = await Skill.find();
  return skill;
};

// router.post("/", [auth, admin], async (req, res) => {
//   try {
//     const { error } = validate(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     const { skillName, category, description, experienceLevel } = req.body;

//     const skill = await new Skill({
//       skillName: skillName,
//       category: category,
//       description: description,
//       experienceLevel: experienceLevel,
//     });

//     await skill.save();
//     res.json({ message: "Skill added successfuly." });
//   } catch (error) {
//     res.json({ error: "Internal server error" });
//   }
// });

const createSkill = async (userBody) => {
  try {
    const { error } = validate(userBody);
    if (error) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Something is missing in the body."
      );
    }

    const { skillName, category, description, experienceLevel } = userBody;

    const skill = await new Skill({
      skillName: skillName,
      category: category,
      description: description,
      experienceLevel: experienceLevel,
    });

    await skill.save();
    return skill;
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

//     const skill = await Skill.findByIdAndUpdate(
//       req.params.id,
//       {
//         skillName: req.body.skillName,
//         category: req.body.category,
//         description: req.body.description,
//         experienceLevel: req.body.experienceLevel,
//       },
//       { new: true }
//     );

//     if (!skill) return res.status(404).json({ error: "Skill not found." });
//     res.json({ message: "Skill has been updated successfuly." });
//   } catch (error) {
//     res.json({ error: "Internal server error." });
//   }
// });

const updateSkillById = async (userId, userBody) => {
  try {
    const { error } = validate(userBody);
    if (error) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Something is missing in the body."
      );
    }

    const skill = await Skill.findByIdAndUpdate(
      userId,
      {
        skillName: userBody.skillName,
        category: userBody.category,
        description: userBody.description,
        experienceLevel: userBody.experienceLevel,
      },
      { new: true }
    );
    return skill;
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Internal server error."
    );
    console.log(error.message);
  }
};

// router.get("/:id", auth, async (req, res) => {
//   const skill = await Skill.findById(req.params.id);
//   if (!skill)
//     return res
//       .status(404)
//       .json({ error: "Skill not found with the given id." });
//   res.send(skill);
// });

const getSkillById = async (userId) => {
  const skill = await Skill.findById(userId);
  if (!skill) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Skill not found with the given id."
    );
  }
  return skill;
};

// router.delete("/:id", [auth, admin], async (req, res) => {
//   const skill = await Skill.findByIdAndDelete(req.params.id);
//   if (!skill)
//     return res
//       .status(404)
//       .json({ error: "Skill not found with the given id." });
//   res.json({ message: "Skill deleted successfuly." });
// });

// module.exports = router;

const deleteSkillById = async (userId) => {
  const skill = await Skill.findByIdAndDelete(userId);
  if (!skill) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Skill not found with the given id."
    );
  }
  return skill;
};

module.exports = {
  getAllSkill,
  createSkill,
  updateSkillById,
  getSkillById,
  deleteSkillById,
};
