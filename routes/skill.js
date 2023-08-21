const { Skill, validate } = require("../model/skill");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const express = require("express");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  const skill = await Skill.find();
  res.json({ data: skill });
});

router.post("/", [auth, admin], async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { skillName, category, description, experienceLevel } = req.body;

    const skill = await new Skill({
      skillName: skillName,
      category: category,
      description: description,
      experienceLevel: experienceLevel,
    });

    await skill.save();
    res.json({ message: "Skill added successfuly." });
  } catch (error) {
    res.json({ error: "Internal server error" });
  }
});

router.put("/:id", [auth, admin], async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      {
        skillName: req.body.skillName,
        category: req.body.category,
        description: req.body.description,
        experienceLevel: req.body.experienceLevel,
      },
      { new: true }
    );

    if (!skill) return res.status(404).json({ error: "Skill not found." });
    res.json({ message: "Skill has been updated successfuly." });
  } catch (error) {
    res.json({ error: "Internal server error." });
  }
});

router.get("/:id", auth, async (req, res) => {
  const skill = await Skill.findById(req.params.id);
  if (!skill)
    return res
      .status(404)
      .json({ error: "Skill not found with the given id." });
  res.send(skill);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const skill = await Skill.findByIdAndDelete(req.params.id);
  if (!skill)
    return res
      .status(404)
      .json({ error: "Skill not found with the given id." });
  res.json({ message: "Skill deleted successfuly." });
});

module.exports = router;
