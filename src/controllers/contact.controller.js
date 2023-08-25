const { contactService } = require("../services/index");

const getAllContact = async (req, res) => {
  try {
    const contact = await contactService.getAllContact();
    res.json({ contact });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const createContact = async (req, res, next) => {
  try {
    const user = await contactService.createContact(req.body);
    if (user) {
      res.json({ message: "Contact has been added successfuly." });
    }
  } catch (error) {
    // next(error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const updateContactById = async (req, res, next) => {
  try {
    const contat = await contactService.updateContact(req.params.id, req.body);
    if (contat) {
      res.json({ message: "Contact has been updated successfuly." });
    }
  } catch (error) {
    // next(error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const getContactById = async (req, res) => {
  try {
    let contact = await contactService.getContactById(req.params.id);
    if (contact) {
      res.json({ contact });
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const deleteContactById = async (req, res) => {
  try {
    let contact = await contactService.deleteContactById(req.params.id);
    if (contact) {
      res.json({ message: "Contact has been deleted successfuly." });
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

module.exports = {
  getAllContact,
  createContact,
  updateContactById,
  getContactById,
  deleteContactById,
};
