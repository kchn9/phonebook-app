import { Heading, Center } from "@chakra-ui/react";
import AddContactForm from "./AddContactForm";

export default function ContactForm({ setChange }) {
  return (
    <aside>
      <Heading my={4}>
        <Center>Add new contact</Center>
      </Heading>
      <AddContactForm setChange={setChange} />
    </aside>
  );
}
