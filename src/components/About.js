import React from 'react'
import img from '../default.jpg'
import { useContext, useState, useEffect, useRef } from 'react';

// importing context to use in the component
import noteContext from '../contexts/notes/noteContext';

const About = () => {
  const a = useContext(noteContext);
  //Edit a Note
  const [details, setDetails] = useState([])

  // making api call to fetch the details of the logged in user
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


  //---- process for updating the user details----//

  const ref = useRef(null)  // using use ref
  const refClose = useRef(null);  // this ref refers to close, we are making bcz when we click on update note we want to close the modal.

  const [updated, setUpdate] = useState([]);
  //API call for updating the details of the user
  const editUser = async (name, email, phone, address) => {

    //API call to our own server
    const response = await fetch(`http://localhost:2000/api/auth/updateuser`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.

      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')

      },
      body: JSON.stringify({ name, email, phone, address}) // body data type must match "Content-Type" header
    });
    const json = await response.json();

    if(json.success){
      setUpdate(json);
    }
    else{
      console.log("user is not seted");
    }
    
  }
  const updateUser = (currentUser) => {
    ref.current.click()  // bootstrap class to toggle a current element in which ref has been declared
    setUpdate(currentUser);
  }

  const saveUpdatedUser = () => {
    editUser(updated.name, updated.email, updated.phone, updated.address)  // making api call with the 
    refClose.current.click();

 }
 const onChange = (e) => {

  setUpdate({ ...updated, [e.target.name]: e.target.value }); // setting the state using spread operator(jo bhi vlaue iss note object ke andar hain wo rahe lekin jo properties uske aaage likhi ja rahi hain usse inko add ya override kar dena)
 }

  return (
    <>
       {/* Using Bootstrap card to display the details of the user */}
      <div className="my-5 d-flex">
        <div className="card" style={{ width: '18rem' }}>
          <img src={img} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title text-center">{details.name}</h5>
            <p className="card-text">Write Something About yourself.</p>
          <button className=" btn btn-primary" onClick={() => { updateUser(details) }}>Edit Profile</button>

          </div>
        </div>

        <div className="card mx-2" style={{ width: "40rem" }}>

          <ul className="list-group list-group-flush">
            <li className="list-group-item"><span className="font-weight-bold">Full Name</span> <span className="mx-3">{details.name}</span></li>
            <li className="list-group-item"><span className="font-weight-bold">Email</span> <span className="mx-5">{details.email}</span></li>
            <li className="list-group-item"><span className="font-weight-bold">Phone</span> <span className="mx-5">{details.phone}</span></li>
            <li className="list-group-item"><span className="font-weight-bold">Address</span> <span className="mx-5">{details.address}</span></li>

          </ul>

        </div>
      </div>
      {/* Modal for edditing the user details */}

      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit User</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* add note form here */}
              <form>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">name</label>
                  <input type="text" className="form-control" id="etitle" name="name" aria-describedby="emailHelp" placeholder="Enter name" onChange={onChange} value={updated.name} />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">email</label>
                  <input type="email" className="form-control" id="edescription" placeholder="Enter email" name="email" onChange={onChange} value={updated.email} />
                </div>

                <div className="form-group">
                  <label htmlFor="tag">phone</label>
                  <input type="text" className="form-control" id="etag" placeholder="Enter phone" name="phone" onChange={onChange} value={updated.phone} />
                </div>
                
                <div className="form-group">
                  <label htmlFor="tag">address</label>
                  <input type="text" className="form-control" id="etag" placeholder="Enter address" name="address" onChange={onChange} value={updated.address} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={saveUpdatedUser}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default About