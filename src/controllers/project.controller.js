const { projectService } = require("../services/index");

const getAllProject = async (req, res) => {
  try {
    const project = await projectService.getAllProject();
    if (project) {
      res.json({ project });
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const createProject = async (req, res, next) => {
  try {
    const project = await projectService.createProject(req.body);
    if (project) {
      res.json({ message: "Project added successfuly." });
    }
  } catch (error) {
    // next(error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const updateProjectById = async (req, res, next) => {
  try {
    const project = await projectService.updateProjectById(
      req.params.id,
      req.body
    );
    if (project) {
      res.json({ message: "Project updated successfuly." });
    }
  } catch (error) {
    // next(error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await projectService.getProjectById(req.params.id);
    if (project) {
      res.send(project);
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const deleteProjectById = async (req, res) => {
  try {
    const project = await projectService.deleteProjectById(req.params.id);
    if (project) {
      res.json({ message: "Project deleted successfuly." });
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

module.exports = {
  getAllProject,
  createProject,
  updateProjectById,
  getProjectById,
  deleteProjectById,
};
