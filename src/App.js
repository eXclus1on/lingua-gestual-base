import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Register/Register";
import TermsOfUsePage from "./pages/TermsOfUsePage/TermsOfUsePage";

function App() {
  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path="/register" element={<Register></Register>} />
          <Route path="/terms" element={<TermsOfUsePage></TermsOfUsePage>}/>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
