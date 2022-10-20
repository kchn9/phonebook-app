// Config
const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const personRouter = require("./controllers/persons");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

// Connection to MongoDB
logger.info("Connecting to: ", config.MONGODB_URI);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("Connection to MongoDB established");
  })
  .catch((error) => {
    logger.error(
      "Conntection to MongoDB rejected, error has been caught: \n",
      error
    );
  });

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/persons", personRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
