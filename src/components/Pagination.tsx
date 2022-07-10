import { useEffect } from "react";
import { Employee } from "@/interfaces";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Button, HStack } from "@chakra-ui/react";

const Pagination = ({
  dataToPaginate,
  next,
  prev,
  control,
  dataSearched,
}: {
  dataToPaginate: Employee[];
  next: () => void;
  prev: () => void;
  control: number;
  dataSearched: Employee[];
}) => {
  useEffect(() => {
    // Only return to prev data after delete

    if (
      dataToPaginate.length > 0 &&
      control > 0 &&
      dataToPaginate.length === control
    ) {
      prev();
    }
  }, [control, dataToPaginate]);

  return (
    <HStack justifyContent={"center"} padding={5}>
      {dataToPaginate.length > 1 && (
        <>
          <Button onClick={prev} disabled={control <= 0 ? true : false}>
            <ChevronLeftIcon />
          </Button>

          <Button
            onClick={next}
            disabled={
              control >= dataToPaginate.length - 2 || dataSearched.length === 1
                ? true
                : false
            }
          >
            <ChevronRightIcon />
          </Button>
        </>
      )}
    </HStack>
  );
};

export default Pagination;
