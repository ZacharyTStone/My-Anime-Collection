import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "normalize.css";
import "./assets/css/index.css";
import App from "./App";
import "./translations/i18n";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
