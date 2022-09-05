import { memo, useContext } from "react";

import { Flex, Select, HStack, Text, Button, Image } from "@chakra-ui/react";

import HappyEmoji from "@/assets/happy.svg";
import NeutralEmoji from "@/assets/neutral.svg";
import SadEmoji from "@/assets/sad.svg";
import EmployeeContext from "@/context/EmployeesContext";

const FilterBar = (): JSX.Element => {
  const { getAllCategories, getAllCompanies, setFilter } =
    useContext(EmployeeContext);
  return (
    <HStack mt={"5"} padding={5} justifyContent="flex-end">
      <Flex
        alignItems={"center"}
        w={{ base: "100%", sm: "100%", md: "100%", lg: "65%", xl: "60%" }}
        gap={"5"}
        flexWrap={{ base: "wrap", sm: "wrap", xl: "nowrap", lg: "nowrap" }}
      >
        <Text as={"span"} fontWeight={"bold"} fontSize={"lg"}>
          Filter:
        </Text>
        <Button
          variant="solid"
          width={"100%"}
          _active={{
            bgColor: "brand.900",
          }}
          _focus={{
            bgColor: "brand.900",
          }}
          onClick={() => setFilter({ type: [], value: "" })}
        >
          All
        </Button>

        <HStack width={"100%"} justifyContent={"center"} alignItems={"center"}>
          <Button
            title="Happy"
            variant={"solid"}
            _active={{
              bgColor: "brand.900",
            }}
            _focus={{
              bgColor: "brand.900",
            }}
            onClick={() => setFilter({ type: ["happiness"], value: "happy" })}
          >
            😀
          </Button>
          <Button
            title="Neutral"
            variant={"solid"}
            _active={{
              bgColor: "brand.900",
            }}
            _focus={{
              bgColor: "brand.900",
            }}
            onClick={() => setFilter({ type: ["happiness"], value: "neutral" })}
          >
            🙂
          </Button>
          <Button
            title="Sad"
            variant={"solid"}
            _active={{
              bgColor: "brand.900",
            }}
            _focus={{
              bgColor: "brand.900",
            }}
            onClick={() => setFilter({ type: ["happiness"], value: "sad" })}
          >
            🙁
          </Button>
        </HStack>

        <Select
          variant="outline"
          placeholder="Companies"
          bg={"white"}
          borderColor={"brand.700"}
          focusBorderColor="brand.900"
          color={"brand.700"}
          fontWeight={"bold"}
          _hover={{
            cursor: "pointer",
          }}
          onChange={(e) =>
            setFilter({ type: ["company"], value: e.target.value })
          }
        >
          {Array.isArray(getAllCompanies) &&
            getAllCompanies.length &&
            getAllCompanies.map((company) => (
              <option key={company} value={company}>
                {company}
              </option>
            ))}
        </Select>

        <Select
          variant="outline"
          placeholder="Categories"
          bg={"white"}
          borderColor={"brand.700"}
          focusBorderColor="brand.900"
          color={"brand.700"}
          fontWeight={"bold"}
          _hover={{
            cursor: "pointer",
          }}
          onChange={(e) =>
            setFilter({ type: ["category"], value: e.target.value })
          }
        >
          {Array.isArray(getAllCategories) &&
            getAllCategories.length &&
            getAllCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
        </Select>
      </Flex>
    </HStack>
  );
};

export default memo(FilterBar);
