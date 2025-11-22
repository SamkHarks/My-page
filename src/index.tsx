import { createRoot } from "react-dom/client";
import "src/app/styles/global.css";
import App from "src/app/App";

// import i18n (needs to be bundled ;))
import "src/lib/i18n/i18n";
import { StrictMode } from "react";
import { ErrorBoundary } from "src/common/components/boundaries/errorBoundary/ErrorBoundary";
import QueryClientProvider from "src/lib/queryClient/QueryClientProvider";

const root = createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <StrictMode>
    <QueryClientProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </QueryClientProvider>
  </StrictMode>,
);
