import { extendTheme } from "@chakra-ui/react";

const fonts = {
  heading: "PT Sans, sans-serif",
  body: "PT Sans, sans-serif",
};

const styles = {
  global: {
    "html, body": {
      color: "#392453",
      bg: "#F3F3F3",
    },
  },
};

const colors = {
  brand: {
    900: "#392453",
    700: "#6136FF",
  },
  bgBody: {
    200: "#F3F3F3",
  },
};

// Components

const Select = {
  variants: {
    outline: {},
  },
};

const Button = {
  variants: {
    solid: {
      color: "white",
      bg: "#6136FF",
      _hover: {
        color: "white",
        bg: "#392453",
      },
      _active: {
        color: "white",
        bg: "#392453",
      },
    },
    outline: {
      color: "brand.700",
      bg: "white",
      borderColor: "brand.700",
      focusBorderColor: "brand.900",
      _hover: {
        borderColor: "brand.900",
        bg: "white",
      },
      _active: {
        borderSize: "1px",
        borderColor: "brand.900",
        bg: "white",
      },
    },

    ghost: {
      _hover: {
        bg: "transparent",
      },
      _active: {
        bg: "transparent",
      },
    },
  },
};

export const theme = extendTheme({
  styles,
  colors,
  fonts,
  components: { Button, Select },
});
