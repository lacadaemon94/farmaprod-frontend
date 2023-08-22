import React from "react";
import { createRoot } from "react-dom/client";
import SessionProvider from "./lib/SessionProvider";

import App from "./App";
import './tailwind.css';

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <SessionProvider>
      <App />
    </SessionProvider>
  </React.StrictMode>,
);