const { Skill, validate } = require("../model/skill");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const skill = await Skill.find();
  res.json({ data: skill });
});

router.post("/", async (req, res) => {
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

router.put("/:id", async (req, res) => {
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

module.exports = router;
