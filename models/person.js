require("dotenv").config({
  path: "../.env",
});
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connection to MongoDB established");
  })
  .catch((error) => {
    console.log(
      "Conntection to MongoDB rejected, error has been caught: \n",
      error
    );
  });

const personSchema = mongoose.Schema({
  fullName: {
    type: String,
    // validators
  },
  number: {
    type: String,
    // validators
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
