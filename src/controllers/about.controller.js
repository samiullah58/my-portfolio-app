const { aboutService } = require("../services");

const getAllAbout = async (req, res) => {
  try {
    const about = await aboutService.getAllAbout();
    res.json({ about });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const createAbout = async (req, res) => {
  try {
    const about = await aboutService.createAbout(req.body);
    res.json({ message: "About has been added successfuly." });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const updateAboutById = async (req, res) => {
  try {
    const about = await aboutService.updateAboutById(req.params.id, req.body);
    if (about) {
      res.json({
        message: "About has been updated successfuly.",
      });
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const getAboutById = async (req, res) => {
  try {
    const about = await aboutService.getAboutById(req.params.id);
    res.json({ about });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const deleteAboutById = async (req, res) => {
  try {
    const about = await aboutService.deleteAboutById(req.params.id);
    if (about) {
      res.json({ message: "About has been deleted successfuly." });
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

module.exports = {
  getAllAbout,
  createAbout,
  updateAboutById,
  getAboutById,
  deleteAboutById,
};
