require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const express = require("express");
const routes = require("./src/routes/index");
const app = express();

const PORT = process.env.PORT;

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("This is my Portfolio Application");
});

app.use(express.json());
app.use(cors());
app.use("/api", routes);
const dbUri =
  process.env.NODE_ENV === "test"
    ? process.env.MONGODB_TEST_URI
    : process.env.MONGODB_URI;

async function connectMongodb() {
  try {
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to Mongodb");
  } catch (error) {
    console.error("Error connecting to mongoDB.", error);
  }
}

connectMongodb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});

module.exports = app;
