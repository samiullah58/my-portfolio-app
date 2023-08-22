const express = require("express");
const aboutRoute = require("./about.route");
const authRoute = require("./auth.route");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/about",
    route: aboutRoute,
  },
  {
    path: "/auth/login",
    route: authRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
