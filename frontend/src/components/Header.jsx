import {
  Flex,
  Image,
  Switch,
  useColorMode,
  Center,
  Heading,
} from "@chakra-ui/react";
import { MoonIcon } from "@chakra-ui/icons";
import Logo from "../assets/phonebook-logo.png";

export default function Header() {
  const { _, toggleColorMode } = useColorMode();
  return (
    <header style={{ marginTop: "10px" }}>
      <Flex
        justify={"space-between"}
        align={"center"}
        margin={{ base: ".4em 1.2em", md: "0.2em 0.5em" }}
      >
        <Center ms={10}>
          <Image
            height={{ base: "60px", md: "80px", lg: "90px" }}
            width="auto"
            src={Logo}
            alt="Phonebook"
          />
          <Heading ms={2} fontSize="2xl">
            Phonebook
          </Heading>
        </Center>

        <Center me={10}>
          <MoonIcon
            viewBox="0 0 24 24"
            boxSize={{ base: "1.5em", md: "2em" }}
            me={{ base: 4, md: 8 }}
          />
          <Switch size={{ base: "md", md: "lg" }} onChange={toggleColorMode} />
        </Center>
      </Flex>
    </header>
  );
}
