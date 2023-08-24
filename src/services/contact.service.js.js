const { Contact, validate } = require("../models/contact");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const express = require("express");
const ApiError = require("../utils/apiError");
const httpStatus = require("http-status");
const router = express.Router();

// router.get("/", auth, async (req, res) => {
//   const contact = await Contact.find();
//   res.json({ contact });
// });

const getAllContact = async () => {
  const contact = await Contact.find();
  return contact;
};

// router.post("/", [auth, admin], async (req, res) => {
//   try {
//     const { error } = validate(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     const { name, email, subject, message } = req.body;

//     const contact = await new Contact({
//       name: name,
//       email: email,
//       subject: subject,
//       message: message,
//     });

//     await contact.save();
//     res.json({ message: "Contact has been added successfuly." });
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error." });
//   }
// });

const createContact = async (userBody) => {
  try {
    const { error } = validate(userBody);
    if (error) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Something is missing in the body."
      );
    }

    const { name, email, subject, message } = userBody;

    const contact = await new Contact({
      name: name,
      email: email,
      subject: subject,
      message: message,
    });

    await contact.save();
    return contact;
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Internal server error."
    );
  }
};

// router.put("/:id", [auth, admin], async (req, res) => {
//   try {
//     const { error } = validate(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     const contact = await Contact.findByIdAndUpdate(
//       req.params.id,
//       {
//         name: req.body.name,
//         email: req.body.email,
//         subject: req.body.subject,
//         message: req.body.message,
//       },
//       { new: true }
//     );

//     if (!contact)
//       return res
//         .status(404)
//         .json({ error: "Contact not found with the given id." });
//     res.json({ message: "Contact has been updated successfuly." });
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error." });
//   }
// });

const updateContact = async (userId, userBody) => {
  try {
    const { error } = validate(userBody);
    if (error) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Something is missing in the body."
      );
    }

    const contact = await Contact.findByIdAndUpdate(
      userId,
      {
        name: userBody.name,
        email: userBody.email,
        subject: userBody.subject,
        message: userBody.message,
      },
      { new: true }
    );

    if (!contact) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        "Contact not found with the given id."
      );
    }
    return contact;
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Internal server error."
    );
  }
};

// router.get("/:id", auth, async (req, res) => {
//   const contact = await Contact.findById(req.params.id);
//   if (!contact)
//     return res
//       .status(404)
//       .json({ error: "Contact not found with the given id." });
//   res.json({ contact });
// });

const getContactById = async (userId) => {
  const contact = await Contact.findById(userId);
  if (!contact) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Contact not found with the given id."
    );
  }
  return contact;
};

// router.delete("/:id", [auth, admin], async (req, res) => {
//   const contact = await Contact.findByIdAndDelete(req.params.id);
//   if (!contact)
//     return res
//       .status(404)
//       .json({ error: "Contact not found with the given id." });
//   res.json({ message: "Contact has been deleted successfuly." });
// });

const deleteContactById = async (userId) => {
  const contact = await Contact.findByIdAndDelete(userId);
  if (!contact) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Contact not found with the given id."
    );
  }
  return contact;
};

// module.exports = router;

module.exports = {
  getAllContact,
  createContact,
  updateContact,
  getContactById,
  deleteContactById,
};
