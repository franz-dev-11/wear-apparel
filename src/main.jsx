import React from "react";
import ReactDOM from "react-dom/client";
// ❌ REMOVED: import { BrowserRouter } from "react-router-dom"; // This import is not needed here
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* 🚀 FIXED: Render App directly, as App.jsx contains the necessary BrowserRouter */}
    <App />
  </React.StrictMode>
);
