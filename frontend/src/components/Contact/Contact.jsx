import { Flex, Box, Text, ButtonGroup, Button } from "@chakra-ui/react";
import { useState } from "react";
import { updateContact, deleteContact } from "../../services/phonebook";
import EditModeContact from "./EditModeContact";

export default function Contact({ contact, setChange }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [person, setPerson] = useState({
    fullName: contact.fullName,
    number: contact.number,
  });
  const [errorMessage, setErrorMessage] = useState("");

  function handleEditClick() {
    if (!isEditMode) {
      setIsEditMode((prev) => !prev);
    } else {
      setErrorMessage("");
      updateContact(contact.id, person)
        .then(() => {
          setChange(true);
          setIsEditMode((prev) => !prev);
        })
        .catch((err) => {
          if (err.response && err.response.data) {
            setErrorMessage(err.response.data.error);
          }
        });
    }
  }

  function handleDeleteClick() {
    deleteContact(contact.id)
      .then(() => {
        setChange(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Flex
      justify={"space-between"}
      align="center"
      w={{ base: "90%", md: "50%" }}
    >
      {isEditMode ? (
        <EditModeContact
          contact={contact}
          person={person}
          setPerson={setPerson}
          errorMessage={errorMessage}
        />
      ) : (
        <ViewModeContact contact={contact} />
      )}
      <ButtonGroup>
        <Button
          size={"sm"}
          colorScheme={isEditMode ? "green" : "blue"}
          onClick={handleEditClick}
        >
          {isEditMode ? "Update" : "Edit"}
        </Button>
        <Button size={"sm"} colorScheme={"red"} onClick={handleDeleteClick}>
          Delete
        </Button>
      </ButtonGroup>
    </Flex>
  );
}

function ViewModeContact({ contact }) {
  return (
    <Box>
      <Text>Contact name: {contact.fullName}</Text>
      <Text>Phone number: {contact.number}</Text>
      <Text fontSize="sm">
        Created: {new Date(contact.created).toLocaleDateString()}
      </Text>
    </Box>
  );
}
