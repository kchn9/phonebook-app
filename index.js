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
      "| body:",
      JSON.stringify(req.body),
    ].join(" ");
  })
);

// Run server
app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
