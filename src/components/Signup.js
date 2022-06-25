import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';


export const Signup = (props) => {

    const [credentials, setCredentials] = useState({name:"", email:"", password:"", cpassword:""})
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {name, email, password, cpassword} = credentials;
        //API call
        const response = await fetch("http://localhost:2000/api/auth/createuser", {
            
            method: 'POST', // *GET, POST, PUT, DELETE, etc.

            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        console.log(json)

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
        <div className= "container" >
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
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
