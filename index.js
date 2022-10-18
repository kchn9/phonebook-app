// Environment variables
require("dotenv").config();

// Express config and middleware
const PORT = process.env.PORT;
const express = require("express");
const morgan = require("./middleware/morgan");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan);

// Unknown endpoint handler
const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: "404 Not found" });
};
app.use(unknownEndpoint);

// MongoDB models
const Person = require("./models/person");

// Endpoints
// GET /api/persons
app.get("/api/persons", (req, res) => {
  Person.find({}).then((allPersons) => {
    res.json(allPersons);
  });
});

// POST /api/persons
app.post("/api/persons", (req, res, next) => {
  const newPerson = new Person({
    ...req.body,
    created: Date.now(),
  });

  newPerson
    .save()
    .then((createdPerson) => res.status(201).json(createdPerson))
    .catch((error) => next(error));
});

// Error handling
function errorHandler(error, req, res, next) {
  console.log(error.message);

  if (error.name === "ValidationError") {
    return res.status(400).json({
      error: error.message,
    });
  }

  next(error);
}
app.use(errorHandler);

// Run server
app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
