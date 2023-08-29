const express = require("express");
const aboutRoute = require("./about.route");
const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const contactRoute = require("./contact.route");
const educationRoute = require("./education.route");
const experienceRoute = require("./experience.route");
const projectRoute = require("./project.route");
const skillRoute = require("./skill.route");
const docsRoute = require("./docs.route");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/about",
    route: aboutRoute,
  },
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/contact",
    route: contactRoute,
  },
  {
    path: "/education",
    route: educationRoute,
  },
  {
    path: "/experience",
    route: experienceRoute,
  },
  {
    path: "/project",
    route: projectRoute,
  },
  {
    path: "/skill",
    route: skillRoute,
  },
];

const devRoutes = [
  {
    path: "/api-docs",
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

devRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
