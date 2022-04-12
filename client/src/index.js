import React from "react";
import ReactDOM from "react-dom";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import LoginScreen from "./components/LoginScreen";

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/chat/:username" element={<App />} />
    </Routes>
  </Router>,
  document.getElementById("root")
);
