const { contactService } = require("../services/index");

const getAllContact = async (req, res) => {
  const contact = await contactService.getAllContact();
  res.json({ contact });
};

const createContact = async (req, res, next) => {
  try {
    const user = await contactService.createContact(req.body);
    if (user) {
      res.json({ message: "Contact has been added successfuly." });
    }
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const contat = await contactService.updateContact(req.params.id, req.body);
    if (contat) {
      res.json({ message: "Contact has been updated successfuly." });
    }
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res) => {
  let contact = await contactService.getContactById(req.params.id);
  if (contact) {
    res.json({ contact });
  }
};

const deleteContactById = async (req, res) => {
  let contact = await contactService.deleteContactById(req.params.id);
  if (contact) {
    res.json({ message: "Contact has been deleted successfuly." });
  }
};

module.exports = {
  getAllContact,
  createContact,
  updateContact,
  getContactById,
  deleteContactById,
};
