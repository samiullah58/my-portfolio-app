const { version } = require("../../package.json");
require("dotenv").config();

const swaggerDef = {
  openApi: "3.0.0",
  info: {
    title: "myPortfolio API documentation",
    description: "This is my portfolio application for everone",
    version,
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT}`,
    },
  ],
};

module.exports = swaggerDef;
