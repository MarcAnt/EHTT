import { memo, useEffect } from "react";
import { Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";

import { BiSearchAlt2 } from "react-icons/bi";
import { SearchBy } from "@/types";
import { Employee } from "@/interfaces";

const PaginationSearch = ({
  placeholder,
  label,
  search,
  setSearch,
  queryBy,
  filterState,
  setIsSearching,
  isDisable,
}: {
  placeholder: string;
  label?: string;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  queryBy: SearchBy[];
  filterState: React.Dispatch<
    React.SetStateAction<{
      type: SearchBy[];
      value: string;
    }>
  >;
  setIsSearching?: React.Dispatch<React.SetStateAction<boolean>>;
  isDisable?: boolean;
  dataSearched?: Employee[];
}) => {
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
          onKeyDown={() => {
            setIsSearching && setIsSearching(true);
          }}
          onChange={(e) => {
            setIsSearching && setIsSearching((prev) => !prev);
            setSearch(e.target.value);
          }}
          disabled={isDisable}
        />
      </InputGroup>
    </>
  );
};

export default memo(PaginationSearch);
