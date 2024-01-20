import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Register/Register";
import TermsOfUsePage from "./pages/TermsOfUsePage/TermsOfUsePage";
import Login from "./pages/Login/Login";
import Record from "./pages/RecordVideo/RecordVideo";
import RecordVideo from "./pages/RecordVideo/RecordVideo";

function App() {
  console.log("I'm here: AVB 2024");
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/terms" element={<TermsOfUsePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/record" element={<RecordVideo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
