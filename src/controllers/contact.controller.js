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

console.log("hiii");
console.log("hiii");
console.log("hiii");
console.log("hiii");
console.log("hiii");

module.exports = {
  getAllContact,
  createContact,
};
