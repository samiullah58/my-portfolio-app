const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDefinition = require("../docs/swagger.json");

const router = express.Router();

const specs = swaggerJsdoc({
  swaggerDefinition,
  apis: ["src/docs/*.json", "src/routes/*.js"],
});
router.use("/", swaggerUi.serve, swaggerUi.setup(specs));

module.exports = router;
