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

  Person.findOne()
    .or([{ fullName: newPerson.fullName }, { number: newPerson.number }])
    .then((person) => {
      if (person) {
        return res.status(409).json({
          id: person.id,
        });
      } else {
        newPerson
          .save()
          .then((createdPerson) => res.status(201).json(createdPerson))
          .catch((error) => next(error));
      }
    })
    .catch((error) => next(error));
});

// GET /api/persons/:id
app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;

  Person.findById(id)
    .then((person) => {
      res.json(person);
    })
    .catch((error) => {
      next(error);
    });
});

// PUT /api/persons/:id
app.put("/api/persons/:id", (req, res, next) => {
  const person = {
    fullName: req.body.fullName,
    number: req.body.number,
  };

  Person.findByIdAndUpdate(req.params.id, person, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((error) => {
      next(error);
    });
});

// DELETE /api/persons/:id
app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((deletedPerson) => {
      if (deletedPerson === null) {
        return res.status(404).json({
          error: "Person not found",
        });
      }
      res.status(200).json(deletedPerson);
    })
    .catch((error) => {
      next(error);
    });
});

// Unknown endpoint handler
const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: "Page not found" });
};
app.use(unknownEndpoint);

// Error handling
function errorHandler(error, req, res, next) {
  console.log(error.message);

  if (error.name === "ValidationError") {
    return res.status(400).json({
      error: error.message,
    });
  }
  if (error.name === "CastError") {
    return res.status(400).json({
      error: "Malformatted id",
    });
  }

  next(error);
}
app.use(errorHandler);

// Run server
app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
