import React, {useState}from 'react'
import {useNavigate} from 'react-router-dom';

export const Login = (props) => {

    const [credentials, setCredentials] = useState({email:"", password:""})

    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        //API call
        const response = await fetch("http://localhost:2000/api/auth/login", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.

            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({ email:credentials.email, password:credentials.password })
        });
        const json = await response.json();

        if(json.success){
            // redirects

            localStorage.setItem('token', json.authtoken);  //saving the authtoken in the local storage.
            props.showAlert("User Logged in successfully", "success");
            navigate('/')

        }
        else{
            props.showAlert("invalid credentials", "danger");
        }
    }
    // on onChange works whenever we write in the input fields
    const onChange = (e) => {

        setCredentials({ ...credentials, [e.target.name]: e.target.value }); // setting the state using spread operator(jo bhi vlaue iss note object ke andar hain wo rahe lekin jo properties uske aaage likhi ja rahi hain usse inko add ya override kar dena)
    }
    return (
        <div className="container mt-5">
            <h1> Login to go to the iNotebook</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" id="password" value={credentials.password} onChange={onChange}/>
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}
