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
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: "Name and number are required" });
  }

  Person.findOne({ name }).then((existingPerson) => {
    if (existingPerson) {
      return res.status(400).json({ error: "Person already exists" });
    }

    const newPerson = new Person({
      name,
      number,
    });

    newPerson.save().then((savedPerson) => {
      res.json(savedPerson);
    });
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
