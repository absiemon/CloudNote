const express = require('express');
const router = express.Router();
const User  = require('../models/User');

const { body, validationResult } = require('express-validator');  // express validator use to validate user details that he want to send to the database.

const bcrypt = require('bcryptjs'); // importing the bcryptjs to use its functionlity of hashing, salting etc.
 
var jwt = require('jsonwebtoken');  // importing jwt to use its functionlity

var fetchuser = require('../middleware/fetchUser');

const JWT_SECRET = 'abshaddpadk';

// ROUTE 1:creating the user using post '/api/auth/'
router.post('/createuser', [
    // express validator work
    // name must be at least 5 chars long
    body('name', 'Enter the valid name').isLength({ min: 3 }),
    body('email', 'Enter the valid email address').isEmail(),
    body('password', 'password must be atleast 5 characters long').isLength({ min: 5 }),
],
    async (req, res)=>{
        // checking if any error occured then send the error in json object. error json has msg prop.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        // try catch is like if and else statement for catching the errors
        try{
        // checking the user with the given email already exists
            let user = await User.findOne({ email: req.body.email});
            if(user){
                return res.status(400).json({ error: 'sorry a user with that email already exists'});
            }

            //before storing the password in the database we encrypt it using bcryptjs
            const salt = await bcrypt.genSalt(10);  // generating the random salt. untill and unless this process //doesn't completed we won't move further thats why we have made it await.

            const secPassword = await bcrypt.hash(req.body.password, salt); // adding the salt in the password and converting it into the hash.

            //Creating the user into the db.
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPassword,
            })

            // res.json(user); // sending the user in response

            // prevsly we are sending the user in response now we will send the webtoken to made a secure conntion
            const data = {
                user:{
                    id: user.id,
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);  // sign is sync func

            res.json({authtoken})
        } 
        catch(error){
            console.error(error.message);
            res.status(500).send("some error occured");
        }
    // console.log(req.body);
    // const user = User(req.body);
    // user.save();   // saving the user into the database
    // res.send(req.body); 
})

// ROUTE 2: Authenticate user using : post "/api/auth/login"
router.post('/login', [
    // express validator work
    body('email', 'Enter the valid email address').isEmail(),
    body('password', 'password cannot be blank').exists(),
],
    async (req, res)=>{

        // checking if any error occured then send the error in json object. error json has msg prop.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        // object destructuring for getting the email and password from the req.body object. otherwise we can also use req.body.email
        const {email, password} = req.body;

        try {
             // looking for the user in db with given details
             let user = await User.findOne({email})

             if(!user){
                return res.status(400).json({error: "Soory cannot login! please try loginin with correct credential"});
             }
             // if user exiests comapre the given password with the user.password

             const passwordCompare  = await bcrypt.compare(password, user.password);
             if(!passwordCompare){
                return res.status(400).json({error: "Soory cannot login ! please try loginin with correct credential"});

             }
             // if password correct then create a webtoken and login the user
             const data = {
                user:{
                    id: user.id,
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);

            res.json({authtoken})
        } 
        catch(error){
            console.error(error.message);
            res.status(500).send("some error occured");
        }
        
     }
)

// ROUTE 3: Gettng the Authenticated(logged in user details) user details : post "/api/auth/getuser"
// Once user logged in and now he want to se its profile then he will make a request to /api/auth/getuser a
// long with the authtoken to the server and server will decode the authtoken and finds the uder id within the decoded authtoken. 
// after getting the user id server finds the details in the database with that user id. we will using a middleware to find the id.
// this middleware runs before the controller (req, res) 
 
router.post('/getuser', fetchuser, async (req, res) => {

    try {
        
        userId = req.user.id // getting the userid from the req that has been come from the middleware
        console.log(userId);
        const user = await User.findById(userId).select("-password") // we dont want to show the password with details. select Specifies which document fields to include or exclude
        res.send(user)
    } 
    catch(error){
        console.error(error.message);
        res.status(500).send("some error occured");
    }
})

module.exports = router