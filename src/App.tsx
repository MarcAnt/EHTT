import { Container } from "@chakra-ui/react";

import FilterBar from "@/components/FilterBar";
import Header from "@/components/Header";
import Main from "@/components/Main";

import "./App.scss";
import { Footer } from "./components/Footer";

const App = (): JSX.Element => {
  return (
    <div className="content">
      <Container maxW="9xl">
        <>
          <Header />
          <FilterBar />
          <Main />
          <Footer />
        </>
      </Container>
    </div>
  );
};

export default App;
