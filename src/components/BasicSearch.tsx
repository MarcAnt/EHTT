import { memo, useState, useEffect } from "react";
import { Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";

import { BiSearchAlt2 } from "react-icons/bi";
import { SearchBy } from "@/types";
import { Employee } from "@/interfaces";

const Search = ({
  placeholder,
  label,
  queryBy,
  filterState,
  setIsSearching,
  isDisable,
}: {
  placeholder: string;
  label?: string;

  queryBy: SearchBy[];
  filterState: React.Dispatch<
    React.SetStateAction<{
      type: SearchBy[];
      value: string;
    }>
  >;

  setIsSearching?: React.Dispatch<React.SetStateAction<boolean>>;
  isDisable?: boolean;
}) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    filterState && filterState({ type: queryBy, value: search });
  }, [search]);

  return (
    <>
      <Text>{label}</Text>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<BiSearchAlt2 color="gray.300" />}
        />
        <Input
          type="search"
          placeholder={placeholder}
          bg={"white"}
          borderColor={"brand.700"}
          focusBorderColor="brand.900"
          _hover={{
            borderColor: "brand.700",
          }}
          value={search}
          onKeyDown={() => setIsSearching && setIsSearching(true)}
          onChange={(e) => setSearch(e.target.value)}
          disabled={isDisable ? isDisable : false}
        />
      </InputGroup>
    </>
  );
};

export default memo(Search);
