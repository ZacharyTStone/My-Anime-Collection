import React from "react";
import ReactDOM from "react-dom";
import "normalize.css";
import "../src/assets/css/index.css";
import App from "./App";
import "./translations/i18n.js";
import { AppProvider } from "./context/appContext";

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
