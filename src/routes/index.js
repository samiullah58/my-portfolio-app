const express = require("express");
const aboutRoute = require("./about.route");
const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const contactRoute = require("./contact.route");

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
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
