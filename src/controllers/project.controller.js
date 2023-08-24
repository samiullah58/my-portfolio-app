const { projectService } = require("../services/index");

const getAllProject = async (req, res) => {
  const project = await projectService.getAllProject();
  if (project) {
    res.json({ project });
  }
};

const createProject = async (req, res, next) => {
  try {
    const project = await projectService.createProject(req.body);
    if (project) {
      res.json({ message: "Project added successfuly." });
    }
  } catch (error) {
    next(error);
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
    next(error);
  }
};

const getProjectById = async (req, res) => {
  const project = await projectService.getProjectById(req.params.id);
  if (project) {
    res.send(project);
  }
};

const deleteProjectById = async (req, res) => {
  const project = await projectService.deleteProjectById(req.params.id);
  if (project) {
    res.json({ message: "Project deleted successfuly." });
  }
};

module.exports = {
  getAllProject,
  createProject,
  updateProjectById,
  getProjectById,
  deleteProjectById,
};
