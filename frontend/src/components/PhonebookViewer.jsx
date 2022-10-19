import { useState, useEffect } from "react";
import { Center, Heading, Stack } from "@chakra-ui/react";
import { getAllContacts } from "../services/phonebook";
import Contact from "./Contact/Contact";
import { Text } from "@chakra-ui/react";

export default function PhonebookViewer({ change, setChange }) {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    getAllContacts().then((data) => {
      setContacts(data);
    });
    return () => setChange(false);
  }, [change]);

  return (
    <main>
      <Heading mt={4} mb={6}>
        <Center>All contacts</Center>
      </Heading>
      <Stack align={"center"} direction={"column"} spacing={4}>
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <Contact key={contact.id} contact={contact} setChange={setChange} />
          ))
        ) : (
          <Text>There are no records yet, feel free to add one!</Text>
        )}
      </Stack>
    </main>
  );
}
