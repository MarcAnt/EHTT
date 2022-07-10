import { useContext, useEffect, useState, useMemo } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Pagination from "@/components/Pagination";
import PaginationSearch from "@/components/PaginationSearch";

import Card from "@/components/card";
import { Employee } from "@/interfaces";
import EmployeeContext from "@/context/EmployeesContext";

const ModalEmployee = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { favorites, filterFavorites, setFilterFavorites } =
    useContext(EmployeeContext);

  const [paginate, setPaginate] = useState<Employee[]>([]);
  const [control, setControl] = useState<number>(0);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const [search, setSearch] = useState("");

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

  const dataResult: Employee[] = useMemo(() => {
    return Array.isArray(favorites) && favorites.length
      ? favorites
          .filter((employee) => {
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
          .map((favorites) => {
            return favorites;
          })
      : [];
  }, [search, control]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"md"} isCentered>
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent bg={"bgBody.200"}>
        <ModalHeader>Favorite Employees List</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          minH={Array.isArray(favorites) && favorites.length ? "450px" : "auto"}
        >
          <PaginationSearch
            placeholder="Search"
            label="Name, category o company"
            search={search}
            setSearch={setSearch}
            queryBy={["name", "category", "company"]}
            filterState={setFilterFavorites}
            setIsSearching={setIsSearching}
            isDisable={favorites.length > 0 ? false : true}
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
                .map((favorites) => {
                  return (
                    <Card
                      key={favorites.id}
                      employee={favorites}
                      isCardModal={true}
                    />
                  );
                })
            ) : (
              <Text
                fontWeight={"bold"}
                textAlign={"center"}
                my={5}
                bg={"brand.700"}
                borderRadius={10}
                p={"5"}
                color={"white"}
              >
                There's not favorites yet. Please add some favorites in the main
                list of employees
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
            dataSearched={dataResult}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalEmployee;
