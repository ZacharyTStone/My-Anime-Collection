import React from "react";
import ReactDOM from "react-dom/client";
import "normalize.css";
import "./assets/css/index.css";
import App from "./App";
import "./translations/i18n.js";
import { AppProvider } from "./context/appContext";
import createRoot from "react-dom/client";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
