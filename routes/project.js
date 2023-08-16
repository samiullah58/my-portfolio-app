const { Project, validate } = require("../model/project");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  const project = await Project.find();
  res.json({ project });
});

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const {
      title,
      description,
      technologiesUsed,
      images,
      projectUrl,
      gitHubUrl,
    } = req.body;

    const project = await new Project({
      title: title,
      description: description,
      technologiesUsed: technologiesUsed,
      images: images,
      projectUrl: projectUrl,
      gitHubUrl: gitHubUrl,
    });

    await project.save();
    res.json({ message: "Project added successfuly." });
  } catch (error) {
    res.json({ error: "Internal server error." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        technologiesUsed: req.body.technologiesUsed,
        images: req.body.images,
        projectUrl: req.body.projectUrl,
        gitHubUrl: req.body.gitHubUrl,
      },
      { new: true }
    );

    if (!project) {
      return res
        .status(404)
        .json({ error: "Project not found with the given id." });
    }

    res.json({ message: "Project updated successfuly." });
  } catch (error) {
    res.json({ error: "Internal server error." });
  }
});

router.get("/:id", async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project)
    return res
      .status(404)
      .json({ error: "Project not found with the given id." });
  res.send(project);
});

router.delete("/:id", async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project)
    return res
      .status(404)
      .json({ error: "Project not found with the given idd." });
  res.json({ message: "Project deleted successfuly." });
});

module.exports = router;
