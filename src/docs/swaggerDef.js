const { version } = require("../../package.json");
require("dotenv").config();

const swaggerDef = {
  openApi: "3.0.0",
  components: {},
  info: {
    title: "myPortfolio API documentation",
    description: "This is my portfolio application for everyone",
    version,
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT}`,
    },
  ],
};

module.exports = swaggerDef;
