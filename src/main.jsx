import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Notifications } from 'react-push-notification';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Notifications />
    <App />
  </React.StrictMode>
);
