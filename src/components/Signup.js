import React, {useState} from 'react'
import {useNavigate, Link} from 'react-router-dom';


export const Signup = (props) => {

    const [credentials, setCredentials] = useState({name:"", email:"", password:"", cpassword:"", phone:"", address:"",})
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {name, email, password, cpassword, phone, address} = credentials;
        //API call
        const response = await fetch("http://localhost:2000/api/auth/createuser", {
            
            method: 'POST', // *GET, POST, PUT, DELETE, etc.

            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({ name, email, password, phone, address })
        });
        const json = await response.json();

        if(json.success){
            localStorage.setItem('token', json.authtoken);  //saving the authtoken in the local storage.
            navigate('/');
           props.showAlert("Account created successfully", "success");

        }
        else{
           props.showAlert("User already exiests", "danger")
        } 
            
    }

    const onChange = (e) => {

        setCredentials({ ...credentials, [e.target.name]: e.target.value }); // setting the state using spread operator(jo bhi vlaue iss note object ke andar hain wo rahe lekin jo properties uske aaage likhi ja rahi hain usse inko add ya override kar dena)
    }
    return (
        <div className= "container mt-5" >
            <h1> Create an account to go to the iNotebook</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name ="name"aria-describedby="emailHelp" onChange={onChange}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name ="email" aria-describedby="emailHelp" onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange}  required />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input type="text" className="form-control" id="phone" name ="phone" aria-describedby="emailHelp" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" className="form-control" id="address" name ="address"aria-describedby="emailHelp" onChange={onChange} placeholder="City, State"/>
                </div>
                <button type="submit" className="btn btn-primary">Sign up</button>
               <Link className="btn btn-primary mx-2" to ="/login" role="button">Login</Link>

            </form>
        </div>
    )
}
