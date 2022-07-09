import { memo, useContext, useState, useEffect } from "react";

import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Btn from "./Button";
import Logo from "../assets/logo.svg";

import { motion } from "framer-motion";
import Search from "./Search";
import Card from "./card";
import Pagination from "./Pagination";

import EmployeeContext from "@/context/EmployeesContext";
import { Employee } from "@/interfaces";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { favorites, setFilter, filterFavorites, setFilterFavorites } =
    useContext(EmployeeContext);

  const [paginate, setPaginate] = useState<Employee[]>([]);
  const [control, setControl] = useState<number>(0);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  useEffect(() => {
    if (Array.isArray(favorites) && favorites.length) {
      setPaginate(favorites);
    }
  }, [favorites]);

  useEffect(() => {
    //if we are searching on the input, back the control to the first data
    if (isSearching) {
      setControl(0);
    }
  }, [isSearching]);

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
            <Search
              placeholder="Name or Category"
              queryBy={["name", "category"]}
              filterState={setFilter}
            />
          </Container>
        </Center>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} size={"md"} isCentered>
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent bg={"bgBody.200"}>
          <ModalHeader>Favorite Employees List</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            minH={
              Array.isArray(favorites) && favorites.length ? "450px" : "auto"
            }
          >
            <Search
              placeholder="Search"
              label="Name, category o company"
              queryBy={["name", "category", "company"]}
              filterState={setFilterFavorites}
              setIsSearching={setIsSearching}
            />

            <Text textAlign={"center"} as={"p"} fontSize={"xl"} my={3}>
              Search and remove from favorite list
            </Text>

            <SimpleGrid
              minChildWidth={"100%"}
              spacing={5}
              justifyItems={"center"}
              justifyContent={"center"}
              alignItems={"center"}
              as={motion.div}
              opacity="1"
              transition="1s linear"
            >
              {Array.isArray(favorites) && favorites.length ? (
                favorites
                  .filter((employee) => {
                    // if (
                    //   !filterFavorites.type.length ||
                    //   filterFavorites.value === ""
                    // )
                    //   return true;

                    return filterFavorites.type.some((key) => {
                      const searchObj = {
                        name: employee.name,
                        category: employee.category,
                        company: employee.company,
                        happiness: employee.happiness,
                      };

                      if (key === "happiness")
                        return searchObj[key] === filterFavorites.value;

                      return searchObj[key]
                        .toLowerCase()
                        .includes(filterFavorites.value.toLowerCase());
                    });
                  })
                  .slice(control, control + 2)
                  .map((favorites) => (
                    <Card
                      key={favorites.id}
                      employee={favorites}
                      isCardModal={true}
                    />
                  ))
              ) : (
                <Text fontWeight={"bold"} textAlign={"center"} my={5}>
                  There's not favorites yet. Please add some favorites in the
                  main list of employees
                </Text>
              )}
            </SimpleGrid>
          </ModalBody>

          <ModalFooter justifyContent={"center"}>
            <Pagination
              dataToPaginate={paginate}
              prev={() => setControl((prev) => prev - 2)}
              next={() => setControl((prev) => prev + 2)}
              control={control}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default memo(Header);
