const { About, validate } = require("../model/about");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const about = await About.find();
  res.json({ about });
});

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const {
      introduction,
      personalInformation,
      professionalSummary,
      hobbiesAndInterest,
    } = req.body;

    const about = await new About({
      introduction: introduction,
      personalInformation: personalInformation,
      professionalSummary: professionalSummary,
      hobbiesAndInterest: hobbiesAndInterest,
    });

    await about.save();
    res.json({ message: "About has been added successfuly." });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const about = await About.findByIdAndUpdate(
      req.params.id,
      {
        introduction: req.body.introduction,
        personalInformation: req.body.personalInformation,
        professionalSummary: req.body.professionalSummary,
        hobbiesAndInterest: req.body.hobbiesAndInterest,
      },
      { new: true }
    );
    if (!about)
      return res
        .status(404)
        .json({ error: "About not found with the given id." });

    res.json({ message: "About has been updated successfuly." });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

router.get("/:id", async (req, res) => {
  const about = await About.findById(req.params.id);
  if (!about)
    return res
      .status(404)
      .json({ error: "About not found with the given id." });
  res.json({ about });
});

router.delete("/:id", async (req, res) => {
  const about = await About.findByIdAndDelete(req.params.id);
  if (!about)
    return res
      .status(404)
      .json({ error: "About not found with the given id." });
  res.json({ message: "About has been deleted successfuly." });
});

module.exports = router;
