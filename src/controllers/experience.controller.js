const { experienceService } = require("../services/index");

const getAllExperience = async (req, res) => {
  try {
    const experience = await experienceService.getAllExperience();
    if (experienceService) {
      res.json({ experience });
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const createExperience = async (req, res, next) => {
  try {
    const experience = await experienceService.createExperience(req.body);
    if (experience) {
      res.json({ message: "Experience has been added successfuly." });
    }
  } catch (error) {
    // next(error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const updateExperienceById = async (req, res, next) => {
  try {
    const experience = await experienceService.updateExperienceById(
      req.params.id,
      req.body
    );
    if (experience) {
      res.json({ message: "Experience has been updated successfuly." });
    }
  } catch (error) {
    // next(error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const getExperienceById = async (req, res) => {
  try {
    const experience = await experienceService.getExperienceById(req.params.id);
    if (experience) {
      res.json({ experience });
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const deleteExperienceById = async (req, res) => {
  try {
    const experience = await experienceService.deleteExperienceById(
      req.params.id
    );
    if (experience) {
      res.json({ message: "Experience has been deleted successfuly." });
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

module.exports = {
  getAllExperience,
  createExperience,
  updateExperienceById,
  getExperienceById,
  deleteExperienceById,
};
