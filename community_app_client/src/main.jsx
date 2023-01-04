import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { StateProvider } from "./store/store";
import reducer, { initialState } from "./reducer/reducer";
import Router from "./routers/Router";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StateProvider
      reducer={reducer}
      initialState={initialState}
      Children={<Router />}
    />
  </BrowserRouter>
);
