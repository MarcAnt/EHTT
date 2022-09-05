import { Text, Link, HStack } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <HStack as="footer" justifyContent={"center"} alignItems={"center"} my={5}>
      <Text as={"i"} color={"brand.900"} fontWeight={"bold"}>
        develope
      </Text>

      <Link
        target="_blank"
        href={"https://www.linkedin.com/in/marcos-esqueda/"}
      >
        @bymarcant
      </Link>
    </HStack>
  );
};
