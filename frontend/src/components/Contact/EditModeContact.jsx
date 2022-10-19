import { findSpecificError } from "../../utils/errorUtils";
import {
  Box,
  Text,
  FormControl,
  Input,
  HStack,
  FormErrorMessage,
} from "@chakra-ui/react";

export default function EditModeContact({
  contact,
  person,
  setPerson,
  errorMessage,
}) {
  return (
    <Box>
      <Text mb={2}>Editing record:</Text>
      <FormControl
        isInvalid={errorMessage && errorMessage.includes("fullName")}
        mb={2}
      >
        <HStack justify={"center"} align="center">
          <Input
            value={person.fullName}
            onChange={(event) => {
              setPerson((prev) => {
                return { ...prev, fullName: event.target.value };
              });
            }}
            maxW={"150px"}
            size={{ sm: "xs", md: "sm" }}
            placeholder="Contact name"
          />
          <FormErrorMessage>
            {findSpecificError("fullName", errorMessage)}
          </FormErrorMessage>
        </HStack>
      </FormControl>
      <FormControl
        isInvalid={errorMessage && errorMessage.includes("number")}
        mb={2}
      >
        <HStack>
          <Input
            value={person.number}
            onChange={(event) => {
              setPerson((prev) => {
                return { ...prev, number: event.target.value };
              });
            }}
            maxW={"150px"}
            size={{ sm: "xs", md: "sm" }}
            placeholder="Phone number"
          />
          <FormErrorMessage>
            {findSpecificError("number", errorMessage)}
          </FormErrorMessage>
        </HStack>
      </FormControl>
      <Text fontSize="sm">
        Created: {new Date(contact.created).toLocaleDateString()}
      </Text>
    </Box>
  );
}
