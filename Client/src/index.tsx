import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./tailwind.css";
import "./assets/scss/index.scss";
import App from "./App";
import "./translations/i18n";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID ?? ""}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);
