const { Experience, validate } = require("../model/experience");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const express = require("express");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  const experience = await Experience.find();
  res.json({ experience });
});

router.post("/", [auth, admin], async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const {
      jobTitle,
      companyName,
      location,
      employmentPeriod,
      description,
      responsibilities,
    } = req.body;

    const experience = await new Experience({
      jobTitle: jobTitle,
      companyName: companyName,
      location: location,
      employmentPeriod: employmentPeriod,
      description: description,
      responsibilities: responsibilities,
    });

    await experience.save();
    res.json({ message: "Experience has been added successfuly." });
  } catch (error) {
    // res.status(500).json({ error: "Internal server error." });
    console.log(error);
  }
});

router.put("/:id", [auth, admin], async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      {
        jobTitle: req.body.jobTitle,
        companyName: req.body.companyName,
        location: req.body.location,
        employmentPeriod: req.body.employmentPeriod,
        description: req.body.description,
        responsibilities: req.body.responsibilities,
      },
      { new: true }
    );
    if (!experience)
      return res
        .status(404)
        .json({ error: "Experience not found with the given id." });

    res.json({ message: "Experience has been updated successfuly." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
});

router.get("/:id", [auth, admin], async (req, res) => {
  const experience = await Experience.findById(req.params.id);
  if (!experience)
    return res
      .status(404)
      .json({ error: "Experience not found with the given id." });
  res.json({ experience });
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const experience = await Experience.findByIdAndDelete(req.params.id);
  if (!experience)
    return res
      .status(404)
      .json({ error: "Experience not found with the given id." });
  res.json({ message: "Experience has been deleted successfuly." });
});

module.exports = router;
