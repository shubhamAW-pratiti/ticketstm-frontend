import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ActiveLinkProvider } from "./Components/ActiveLinkContext";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <ActiveLinkProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ActiveLinkProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
