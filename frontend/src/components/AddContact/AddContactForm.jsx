import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  FormErrorMessage,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useState } from "react";
import { createContact, updateContact } from "../../services/phonebook";
import { findSpecificError } from "../../utils/errorUtils";

export default function AddContactForm({ setChange }) {
  const [alert, setAlert] = useState({
    isAlert: false,
    type: "",
    message: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");
    createContact(person)
      .then(() => {
        setChange(true);
        setPerson({
          fullName: "",
          number: "",
        });
        setAlert({
          isAlert: true,
          type: "success",
          message: "Person has been added succesfully",
        });
      })
      .catch((err) => {
        const res = err.response;
        setAlert({
          isAlert: true,
          type: "error",
          message: "There was an error processing your request",
        });
        if (res && res.data) {
          if (res.status === 400) {
            setErrorMessage(res.data.error);
          }
          if (res.status === 409) {
            setAlert({
              isAlert: true,
              type: "warning",
              message: `Conflict has been found, trying to update existing record with name: ${person.fullName}`,
            });
            updateContact(res.data.id, person)
              .then(() => {
                setChange(true);
                setAlert({
                  isAlert: true,
                  type: "success",
                  message: `Record with name: ${person.fullName} has been updated succesfully.`,
                });
                setPerson({
                  fullName: "",
                  number: "",
                });
              })
              .catch((err) => {
                const res = err.response;
                setAlert({
                  isAlert: true,
                  type: "error",
                  message: "There was an error processing your request",
                });
              });
          }
        }
      });
  }

  const [person, setPerson] = useState({
    fullName: "",
    number: "",
  });
  function handleInputChange(event, value) {
    setPerson((prev) => {
      return {
        ...prev,
        [value]: event.target.value,
      };
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack mx={"1em"} margin={"0 auto"} w={{ sm: "80vw", md: "50vw" }}>
        {alert.isAlert && (
          <Alert status={alert.type}>
            <AlertIcon />
            {alert.message}
          </Alert>
        )}
        <FormControl
          isRequired={true}
          isInvalid={errorMessage && errorMessage.includes("fullName")}
        >
          <FormLabel m="0">Name</FormLabel>
          <Input
            onChange={(e) => handleInputChange(e, "fullName")}
            value={person.fullName}
            placeholder="Enter contact name"
            minLength={2}
          />
          {errorMessage && errorMessage.includes("fullName") && (
            <FormErrorMessage justifyContent={"center"}>
              {findSpecificError("fullName", errorMessage)}
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl
          isRequired={true}
          isInvalid={errorMessage && errorMessage.includes("number")}
        >
          <FormLabel m="0">Phone number</FormLabel>
          <Input
            onChange={(e) => handleInputChange(e, "number")}
            value={person.number}
            placeholder="Enter contact phone number with country code"
            minLength={8}
            type="tel"
          />
          {errorMessage && errorMessage.includes("number") && (
            <FormErrorMessage justifyContent={"center"}>
              {findSpecificError("number", errorMessage)}
            </FormErrorMessage>
          )}
        </FormControl>
      </Stack>
      <Button
        variant="outline"
        colorScheme="green"
        display={"block"}
        m="1em auto"
        type="submit"
      >
        Create new contact
      </Button>
    </form>
  );
}
