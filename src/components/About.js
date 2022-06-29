import React from 'react'
import img from '../default.jpg'
import { useContext, useState, useEffect } from 'react';

// importing context to use in the component
import noteContext from '../contexts/notes/noteContext';

const About = () => {
  const a = useContext(noteContext);
  //Edit a Note
  const [details, setDetails] = useState([])

  useEffect(() => {

    //API call to our own server
    async function fetchuser() {
      const response = await fetch("http://localhost:2000/api/auth/getuser", {

        method: 'POST', // *GET, POST, PUT, DELETE, etc.

        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')

        },
        body: JSON.stringify() // body data type must match "Content-Type" header
      });
      const json = await response.json();
      console.log(json);
      setDetails(json);

    }
    fetchuser();
  }, [])


  return (
    <>
      <div className="my-5 d-flex">
        <div className="card" style={{ width: '18rem' }}>
          <img src={img} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{details.name}</h5>
            <p className="card-text">Write Something About yourself.</p>
            <a href="#" className="btn btn-primary">Go somewhere</a>
          </div>
        </div>

        <div className="card mx-2" style={{width: "40rem"}}>
  
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><span className="font-weight-bold">Full Name</span> <span className="mx-3">{details.name}</span></li>
            <li className="list-group-item"><span className="font-weight-bold">Email</span> <span className="mx-5">{details.email}</span></li>
            <li className="list-group-item"><span className="font-weight-bold">Phone</span> <span className="mx-5">{details.phone}</span></li>
            <li className="list-group-item"><span className="font-weight-bold">Address</span> <span className="mx-5">{details.address}</span></li>

          </ul>
        </div>
      </div>
    </>
  )
}

export default About