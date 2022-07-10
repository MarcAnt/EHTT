import { useContext, useMemo } from "react";

import EmployeeContext from "@/context/EmployeesContext";
import { Box, SimpleGrid, Skeleton, Text } from "@chakra-ui/react";
import Card from "./card";

const Main = () => {
  const {
    filteredEmployees: employees,
    filter,
    loading,
    error,
  } = useContext(EmployeeContext);

  const employeesData = useMemo(() => {
    const data =
      Array.isArray(employees) && employees.length > 1
        ? employees.filter((employee) => {
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
        : [];

    return data;
  }, [employees, filter.value]);

  if (loading || error) {
    return (
      <SimpleGrid
        minChildWidth={{ base: "100%", sm: "400px", md: "400px" }}
        spacing={5}
        justifyItems={"center"}
        alignItems={"center"}
      >
        {Array.from({ length: 3 }, (_, i) => (
          <Skeleton
            key={i}
            width={"100%"}
            height={"150px"}
            borderRadius={"0.5rem"}
          />
        ))}
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
        {employeesData.length ? (
          employeesData.map((employee) => {
            return (
              <Card key={employee.id} employee={employee} isCardModal={false} />
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
            There's not data to filter. Please, click to "All".
          </Text>
        )}
      </SimpleGrid>
    </Box>
  );
};

export default Main;
