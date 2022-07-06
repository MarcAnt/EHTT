import { useContext } from "react";

import EmployeeContext from "@/context/EmployeesContext";
import { Box, SimpleGrid, Skeleton } from "@chakra-ui/react";
import Card from "./card";

const Main = () => {
  const {
    filteredEmployees: employees,
    filter,
    loading,
    error,
  } = useContext(EmployeeContext);

  if (loading || error) {
    return (
      <SimpleGrid
        minChildWidth={{ base: "100%", sm: "400px", md: "400px" }}
        spacing={5}
        justifyItems={"center"}
        alignItems={"center"}
      >
        <Skeleton width={"100%"} height={"150px"} borderRadius={"0.5rem"} />
        <Skeleton width={"100%"} height={"150px"} borderRadius={"0.5rem"} />
        <Skeleton width={"100%"} height={"150px"} borderRadius={"0.5rem"} />
      </SimpleGrid>
    );
  }

  return (
    <Box as={"main"} my={5}>
      <SimpleGrid
        minChildWidth={{ base: "100%", sm: "400px", md: "400px" }}
        spacing={5}
        justifyItems={"center"}
        alignItems={"center"}
      >
        {employees
          .filter((employee) => {
            if (!filter.type.length || filter.value === "") return true;

            return filter.type.some((key) => {
              const searchObj = {
                name: employee.name,
                category: employee.category,
                company: employee.company,
                happiness: employee.happiness,
              };

              if (key === "happiness") return searchObj[key] === filter.value;

              return searchObj[key]
                .toLowerCase()
                .includes(filter.value.toLowerCase());
            });
          })
          .map((employee) => (
            <Card key={employee.id} employee={employee} isCardModal={false} />
          ))}
      </SimpleGrid>
    </Box>
  );
};

export default Main;
