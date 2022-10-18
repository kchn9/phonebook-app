// Environment variables
require("dotenv").config();

// Express config
const PORT = process.env.PORT;

const express = require("express");
const app = express();
app.use(express.json());

// Run server
app.listen(PORT, () => {
  console.log(`%cServer is running on PORT:${PORT}`);
});
