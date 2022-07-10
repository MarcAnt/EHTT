import { memo, useContext } from "react";

import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import Btn from "./Button";
import Logo from "../assets/logo.svg";

import EmployeeContext from "@/context/EmployeesContext";

import ModalEmployee from "./ModalEmployee";
import BasicSearch from "./BasicSearch";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setFilter } = useContext(EmployeeContext);

  return (
    <>
      <Box as={"header"}>
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          padding={"5"}
          flexDirection={{ base: "column", sm: "column", md: "row" }}
          rowGap={"0.5rem"}
        >
          <Image src={Logo} alt="Logo EHTT" />
          <Btn title="Show my favorites" variant="solid" onClick={onOpen} />
        </Flex>
        <Center textAlign={"center"} flexDirection={"column"}>
          <Heading as={"h1"}>Employee’s Happiness Tracking Tool</Heading>
          <Heading as={"h2"} size={"sm"} marginBlock={"5"}>
            Track the happiness level of the people related to their company
          </Heading>
        </Center>
        <Center flexDirection={"column"}>
          <Container>
            <BasicSearch
              placeholder="Name or Category"
              queryBy={["name", "category"]}
              filterState={setFilter}
            />
          </Container>
        </Center>
      </Box>

      <ModalEmployee isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default memo(Header);
