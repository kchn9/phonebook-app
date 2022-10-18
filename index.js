// Environment variables
require("dotenv").config();

// Express config and middleware
const PORT = process.env.PORT;

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      "-",
      tokens["response-time"](req, res),
      "ms",
      req.body && `| body: ${JSON.stringify(req.body)}`,
    ].join(" ");
  })
);

// MongoDB models
const Person = require("./models/person");

// Endpoints
app.get("/api/persons", (req, res) => {});

// Run server
app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
