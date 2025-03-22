import { createRoot } from "react-dom/client";
import "src/global/global.css";
import App from "src/components/app/App";

// import i18n (needs to be bundled ;))
import "src/i18n";
import { StrictMode } from "react";
import { ErrorBoundary } from "src/components/boundaries/errorBoundary/ErrorBoundary";

const root = createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
