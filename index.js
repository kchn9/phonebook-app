// Environment variables
require("dotenv").config();

// Express config
const PORT = process.env.PORT;

const express = require("express");
const app = express();
app.use(express.json());
const morgan = require("morgan");
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
