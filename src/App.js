<<<<<<< Updated upstream
import React from 'react';
import Register from './components/Register';
=======
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Register/Register";
import TermsOfUsePage from "./pages/TermsOfUsePage/TermsOfUsePage";
import Login from "./pages/Login/Login"
>>>>>>> Stashed changes

function App() {
  return (
    <div className="App">
<<<<<<< Updated upstream
    
      <Register />
=======

      <Router>
        <Routes>
          <Route path="/register" element={<Register></Register>} />
          <Route path="/terms" element={<TermsOfUsePage></TermsOfUsePage>}/>
          <Route path="/login" element={<Login></Login>}/>
        </Routes>
      </Router>
>>>>>>> Stashed changes
    </div>
  );
}

export default App;
