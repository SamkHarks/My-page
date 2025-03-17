import { createRoot } from "react-dom/client";
import "src/global/global.css";
import App from "src/components/app/App";
import { Modal } from "src/components/modal/Modal";

// import i18n (needs to be bundled ;))
import "src/i18n";
import { StrictMode } from "react";

const root = createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <StrictMode>
    <App />
    <Modal />
  </StrictMode>,
);
