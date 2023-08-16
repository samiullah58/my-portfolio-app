const { Education, validate } = require("../model/education");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const express = require("express");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  const education = await Education.find();
  res.json({ education });
});

router.post("/", [auth, admin], async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const {
      institutionName,
      degree,
      fieldOfStudy,
      graduationYear,
      description,
    } = req.body;

    const education = await new Education({
      institutionName: institutionName,
      degree: degree,
      fieldOfStudy: fieldOfStudy,
      graduationYear: graduationYear,
      description: description,
    });

    await education.save();
    res.json({ message: "Education has been added successfuly." });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

router.put("/:id", [auth, admin], async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const education = await Education.findByIdAndUpdate(
      req.params.id,
      {
        institutionName: req.body.institutionName,
        degree: req.body.degree,
        fieldOfStudy: req.body.fieldOfStudy,
        graduationYear: req.body.graduationYear,
        description: req.body.description,
      },
      { new: true }
    );

    if (!education)
      return res
        .status(404)
        .json({ error: "Education not found with the given id." });
    res.json({ message: "Education has been updated successfuly." });
  } catch (error) {
    res.json({ error: "Internal server error." });
  }
});

router.get("/:id", [auth, admin], async (req, res) => {
  const education = await Education.findById(req.params.id);
  if (!education)
    return res
      .status(404)
      .json({ error: "Education not found with the given id." });
  res.send(education);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const education = await Education.findByIdAndDelete(req.params.id);
  if (!education)
    return res
      .status(404)
      .json({ error: "Education not found with the given id." });
  res.json({ message: "Education has been deleted successfuly." });
});
module.exports = router;
