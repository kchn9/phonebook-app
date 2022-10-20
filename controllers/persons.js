const personsRouter = require("express").Router();

// MongoDB model
const Person = require("../models/person");

// GET /api/persons
personsRouter.get("/", (req, res) => {
  Person.find({}).then((allPersons) => {
    res.json(allPersons);
  });
});

// GET /api/persons/:id
personsRouter.get("/:id", (req, res, next) => {
  const id = req.params.id;

  Person.findById(id)
    .then((person) => {
      res.json(person);
    })
    .catch((error) => {
      next(error);
    });
});

// POST /api/persons
personsRouter.post("/", (req, res, next) => {
  const newPerson = new Person({
    ...req.body,
    created: Date.now(),
  });

  Person.findOne({ fullName: newPerson.fullName })
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

// PUT /api/persons/:id
personsRouter.put("/:id", (req, res, next) => {
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
personsRouter.delete("/:id", (req, res, next) => {
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

module.exports = personsRouter;
