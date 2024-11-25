import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import ReactGA from "react-ga4";
import * as Sentry from "@sentry/react";

import { theme } from "./theme/index.ts";
import { App } from "./App.tsx";
import { RouteProvider } from "./providers/router.tsx";
import { NewsProvider } from "./providers/news.tsx";

ReactGA.initialize(`${import.meta.env.VITE_APP_GA4_ID}`);

if (import.meta.env.VITE_APP_MODE === "production") {
  Sentry.init({
    dsn: `${import.meta.env.VITE_APP_SENTRY_DSN}`,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    tracesSampleRate: 1.0,
    tracePropagationTargets: [new RegExp(import.meta.env.VITE_APP_DOMAIN)],
    replaysSessionSampleRate: 0.5,
    replaysOnErrorSampleRate: 1.0,
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <RouteProvider>
        <NewsProvider>
          <App />
        </NewsProvider>
      </RouteProvider>
    </ChakraProvider>
  </StrictMode>
);
