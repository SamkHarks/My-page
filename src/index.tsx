import ReactDOM from "react-dom/client";
import "src/global/global.css";
import App from "src/App";

// import i18n (needs to be bundled ;))
import "src/i18n";
import { StrictMode } from "react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
