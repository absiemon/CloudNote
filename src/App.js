import React,{useState} from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./contexts/notes/NoteState";
import { Alert } from "./components/Alert";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";

function App() {

  
  const[alert, setalert] = useState(null);
  // we want to show different type of alert ex(success, failure, denger etc)// 
  // with the help of 
  const showAlert = (message, type) => {
    setalert({
      msg: message,
      type: type       // initiallly alert was null now alert is an object
    });

    setTimeout(() => {
      setalert(null);
    }, 2000);

  }

  return (
    <>
      {/* we want that context is available for all components  */}
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert ={alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert}/>} />
              <Route exact path="/about" element={<About/>} />
              <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
              <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
            </Routes> 
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
