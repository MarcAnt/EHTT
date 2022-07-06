import { memo, useState, useEffect } from "react";
import { Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";

import { BiSearchAlt2 } from "react-icons/bi";
import { SearchBy } from "@/types";

const Search = ({
  placeholder,
  label,
  queryBy,
  filterState,
  setIsSearching,
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
}) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    filterState({ type: queryBy, value: search });
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
        />
      </InputGroup>
    </>
  );
};

export default memo(Search);
