const mongoose = require("mongoose");

// Connect to MongoDB Atlas
const password = process.argv[2];
const url = `mongodb+srv://rjloube:${password}@cluster0.wlyvwiq.mongodb.net/phonebookApp?retryWrites=true&w=majority`;
mongoose.set("strictQuery", false);
mongoose.connect(url);

// Define the person schema
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

// Create the person model
const Person = mongoose.model("Person", personSchema);

// If only password is provided, display all entries in the phonebook
if (process.argv.length === 3) {
  Person.find({}).then((persons) => {
    console.log("phonebook:");
    persons.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}

// If name and number are provided, add a new entry to the phonebook
if (process.argv.length === 5) {
  const name = process.argv[3];
  const number = process.argv[4];

  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}

// If wrong number of arguments are provided, display error message
if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.log(
    "Invalid number of arguments. Please provide either only the password or the name and number."
  );
  mongoose.connection.close();
}
