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
    minLength: [2, "should be at least 2 char long"],
    required: [true, "is required"],
  },
  number: {
    type: String,
    minLength: [8, "should be at least 8 char long"],
    validate: {
      validator: function (number) {
        return /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(
          number
        );
      },
      message: (props) => `${props.value} is not valid phone number!`,
    },
    required: [true, "is required"],
  },
  created: {
    type: Date,
    required: true,
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
