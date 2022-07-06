import { memo, useContext } from "react";

import {
  Flex,
  Select,
  HStack,
  Text,
  Popover,
  Button,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Image,
} from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";

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
          onClick={() => setFilter({ type: [], value: "" })}
        >
          All
        </Button>

        <Popover>
          <PopoverTrigger>
            <Button
              variant="outline"
              rightIcon={<FiChevronDown />}
              width={"100%"}
              justifyContent={"space-between"}
              _active={{
                borderWidth: "2px",
                borderColor: "brand.900",
              }}
            >
              Happiness
            </Button>
          </PopoverTrigger>
          <PopoverContent bg={"brand.900"} width={"100%"}>
            <PopoverBody>
              <HStack justifyContent={"center"} alignItems={"center"}>
                <Image
                  src={HappyEmoji}
                  alt={"Happy Emoji"}
                  cursor={"pointer"}
                  onClick={() =>
                    setFilter({ type: ["happiness"], value: "happy" })
                  }
                />
                <Image
                  src={NeutralEmoji}
                  alt={"Neutral Emoji"}
                  cursor={"pointer"}
                  onClick={() =>
                    setFilter({ type: ["happiness"], value: "neutral" })
                  }
                />
                <Image
                  src={SadEmoji}
                  alt={"Happy Emoji"}
                  cursor={"pointer"}
                  onClick={() =>
                    setFilter({ type: ["happiness"], value: "sad" })
                  }
                />
              </HStack>
            </PopoverBody>
          </PopoverContent>
        </Popover>

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
          {getAllCompanies.map((company) => (
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
          {getAllCategories.map((category) => (
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
