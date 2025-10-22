import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainScreen from "./pages/MainScreen";
import Results from "./pages/Results";
import './index.css'; // <-- Import CSS here

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainScreen />} />
      <Route path="/results" element={<Results />} />
    </Routes>
  </BrowserRouter>
);
