import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Register/Register";
import TermsOfUsePage from "./pages/TermsOfUsePage/TermsOfUsePage";
import Login from "./pages/Login/Login";
import IvlingInterface from "./pages/IvlingInterface/IvlingInterface";

function App() {
  console.log("I'm here: AVB 2024");
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/terms" element={<TermsOfUsePage />} />
          <Route path="/ivlinginterface" element={<IvlingInterface />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
