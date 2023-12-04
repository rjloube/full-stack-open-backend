require("dotenv").config();
const express = require("express");
const app = express();
const Person = require("./models/person");
app.use(express.json());
const morgan = require("morgan");
morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
const cors = require("cors");
app.use(cors());
app.use(express.static("build"));

// let persons = [
//   {
//     id: 1,
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     id: 2,
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: 3,
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     id: 4,
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },
// ];

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get("/info", (req, res) => {
  Person.find({}).then((persons) => {
    res.send(
      `<p>Phone has info for ${persons.length} people</p>
      <p>${new Date()}</p>`
    );
  });
});

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id)
    .then((person) => {
      res.json(person);
    })
    .catch((error) => {
      console.log(`Error getting person: ${error}}`);
      return res.status(400).json({
        error: "person not found",
      });
    });
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  console.log("id:", id, typeof id);
  Person.deleteOne({ _id: id }).then((result) => {
    console.log("result:", result);
    res.status(204).end();
  });
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "name or number missing",
    });
  } else if (
    persons.find(
      (person) => person.name.toLowerCase() === body.name.toLowerCase()
    )
  ) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    id: Math.floor(Math.random() * 10000),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);
  res.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
