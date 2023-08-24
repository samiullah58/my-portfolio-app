const { Contact, validate } = require("../models/contact");
const ApiError = require("../utils/apiError");
const httpStatus = require("http-status");

const getAllContact = async () => {
  const contact = await Contact.find();
  return contact;
};

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

module.exports = {
  getAllContact,
  createContact,
  updateContact,
  getContactById,
  deleteContactById,
};
