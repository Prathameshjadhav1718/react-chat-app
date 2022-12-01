import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./components/App";
import { Toaster } from "react-hot-toast";
import { ContactsProvider } from "./providers/Provider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Create a React root element.
const root = ReactDOM.createRoot(document.getElementById("root"));
// Renders the root.
root.render(
  <React.StrictMode>
    <Toaster />
    <ContactsProvider>
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </ContactsProvider>
  </React.StrictMode>
);
