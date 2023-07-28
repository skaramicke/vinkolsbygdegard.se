import React from "react";
import { createRoot } from "react-dom/client";
import "./style/index.css";
import "./style/align.sass";
import App from "./App";

const container = document.getElementById("root");
if (!container) throw new Error("No container");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
