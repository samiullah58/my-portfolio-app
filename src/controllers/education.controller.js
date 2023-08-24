const { educationService } = require("../services/index");

const getAllEducation = async (req, res) => {
  const education = await educationService.getAllEducation();
  res.json({ education });
};

const createEducation = async (req, res, next) => {
  try {
    const education = await educationService.createEducation(req.body);
    if (education) {
      res.json({ message: "Education has been added successfuly." });
    }
  } catch (error) {
    next(error);
  }
};

const updateEducation = async (req, res, next) => {
  try {
    const education = await educationService.updateEducation(
      req.params.id,
      req.body
    );
    if (education) {
      res.json({ message: "Education has been updated successfuly." });
    }
  } catch (error) {
    next(error);
  }
};

const getEducationById = async (req, res) => {
  const education = await educationService.getEducationById(req.params.id);
  if (education) {
    res.json({ education });
  }
};

const deleteEducationById = async (req, res) => {
  const education = await educationService.deleteEducationById(req.params.id);
  if (education) {
    res.json({ message: "Education has been deleted successfuly." });
  }
};

module.exports = {
  getAllEducation,
  createEducation,
  updateEducation,
  getEducationById,
  deleteEducationById,
};
