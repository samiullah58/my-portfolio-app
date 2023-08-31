const mongoose = require("mongoose");
const faker = require("faker");
const Category = require("../../src/models/category.model");

const categoryOne = {
  _id: mongoose.Types.ObjectId(),
  title: faker.lorem.words(2),
  shortTitle: faker.lorem.words(2),
  descriptionTitle: faker.lorem.sentence(),
  image: faker.image.imageUrl(),
  banner: faker.image.imageUrl(),
  slug: faker.lorem.slug(),
  showInMenu: true,
  seoTitle: faker.lorem.words(3),
  seoDescription: faker.lorem.sentence(),
  seoKeywords: faker.lorem.words(5),
};

const categoryTwo = {
  _id: mongoose.Types.ObjectId(),
  title: faker.lorem.words(2),
  shortTitle: faker.lorem.words(2),
  descriptionTitle: faker.lorem.sentence(),
  image: faker.image.imageUrl(),
  banner: faker.image.imageUrl(),
  slug: faker.lorem.slug(),
  showInMenu: true,
  seoTitle: faker.lorem.words(3),
  seoDescription: faker.lorem.sentence(),
  seoKeywords: faker.lorem.words(5),
};

const admin = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password: faker.internet.password(),
  role: "admin",
  isEmailVerified: false,
};

const insertCategories = async (categories) => {
  // eslint-disable-next-line no-console
  await Category.insertMany(categories.map((category) => ({ ...category })));
};

module.exports = {
  categoryOne,
  categoryTwo,
  admin,
  insertCategories,
};
