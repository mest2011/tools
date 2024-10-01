import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme/index.ts";
import { App } from "./App.tsx";
import ReactGA from "react-ga4";

ReactGA.initialize(`${import.meta.env.REACT_APP_GA4_ID}`);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </StrictMode>
);

