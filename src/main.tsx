import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/pt-sans";
import { theme } from "./theme";
import App from "./App";
import { EmployeeProvider } from "./context/EmployeesContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <EmployeeProvider>
        <App />
      </EmployeeProvider>
    </ChakraProvider>
  </React.StrictMode>
);
