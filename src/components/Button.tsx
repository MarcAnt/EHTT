import { Button } from "@chakra-ui/react";
import { BiLike } from "react-icons/bi";

const Btn = ({
  title,
  variant,
  onClick,
}: {
  title: string;
  variant?: string;
  onClick?: () => void;
}): JSX.Element => {
  return (
    <Button
      rightIcon={<BiLike />}
      variant={variant}
      onClick={onClick}
      width={{ base: "100%", md: "auto", sm: "100%", lg: "auto" }}
    >
      {title}
    </Button>
  );
};

export default Btn;
