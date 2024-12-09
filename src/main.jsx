import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HashRouter as Router } from "react-router-dom";
import { AuthProviderWrapper } from "./context/auth.context.jsx";
import { PopupProviderWrapper } from "./context/popups.context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProviderWrapper>
      <PopupProviderWrapper>
        <Router>
          <App />
        </Router>
      </PopupProviderWrapper>
    </AuthProviderWrapper>
  </StrictMode>
);
