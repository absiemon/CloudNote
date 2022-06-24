import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./contexts/notes/NoteState";
import { Alert } from "./components/Alert";

function App() {
  return (
    <>
      {/* we want that context is available for all components  */}
      <NoteState>
        <Router>
          <Navbar />
          <Alert message={"this a alert from iNotebook"}/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
