const { Contact, validate } = require("../model/contact");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  const contact = await Contact.find();
  res.json({ contact });
});

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { name, email, subject, message } = req.body;

    const contact = await new Contact({
      name: name,
      email: email,
      subject: subject,
      message: message,
    });

    await contact.save();
    res.json({ message: "Contact has been added successfuly." });
  } catch (error) {
    // res.status(500).json({ error: "Internal server error." });
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message,
      },
      { new: true }
    );

    if (!contact)
      return res
        .status(404)
        .json({ error: "Contact not found with the given id." });
    res.json({ message: "Contact has been updated successfuly." });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

router.get("/:id", async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact)
    return res
      .status(404)
      .json({ error: "Contact not found with the given id." });
  res.json({ contact });
});

router.delete("/:id", async (req, res) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);
  if (!contact)
    return res
      .status(404)
      .json({ error: "Contact not found with the given id." });
  res.json({ message: "Contact has been deleted successfuly." });
});

module.exports = router;
