import React from "react";
import { render } from "react-dom";
import { AuthContextProvider } from "../../context/AuthContext";

import Popup from "./Popup";
import "./index.css";

render(
  <AuthContextProvider>
    <Popup />
  </AuthContextProvider>,
  window.document.querySelector("#app-container")
);

if (module.hot) module.hot.accept();
