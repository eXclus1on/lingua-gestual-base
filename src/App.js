import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Register/Register";
import TermsOfUsePage from "./pages/TermsOfUsePage/TermsOfUsePage";
import Login from "./pages/Login/Login"

function App() {
  return (
    <div className="App">


      <Register />
      <Router>
        <Routes>
          <Route path="/register" element={<Register></Register>} />
          <Route path="/terms" element={<TermsOfUsePage></TermsOfUsePage>}/>
          <Route path="/login" element={<Login></Login>}/>
        </Routes>
      </Router>
    </div>
  );
}