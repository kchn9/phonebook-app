// Environment variables
require("dotenv").config();

// Express config
const PORT = process.env.PORT;

const express = require("express");
const app = express();

// Run server
app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
