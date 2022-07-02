import React, { useEffect } from 'react'

import {Link, useLocation, useNavigate} from "react-router-dom";


const Navbar = ()=>{
    // making the nav-item active and inactive using useLocation Hook
    let navigate = useNavigate();
    const handleLogout = ()=>{
        localStorage.removeItem('token');
        navigate('/login')

    }
    let location = useLocation();  //location will be an object and it has the property pathname
    useEffect(() =>{

    }, [location])
    return(
        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">CloudNote</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              {localStorage.getItem('token')&&<li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/"? "active": ""}`} aria-current="page" to="/">Home</Link>
              </li>}
              
              {localStorage.getItem('token')&&<li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/about"? "active": ""}`} to="/about">About</Link>
              </li>}
            </ul>
            {localStorage.getItem('token')&&
            
             <button className="btn btn-primary" onClick={handleLogout}>Logout</button>}
          </div>
        </div>
      </nav>
    )
}

export default Navbar