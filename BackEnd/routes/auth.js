const express = require('express');
const router = express.Router();
const User  = require('../models/User');

const { body, validationResult } = require('express-validator');  // express validator use to validate user details that he want to send to the database.

const bcrypt = require('bcryptjs'); // importing the bcryptjs to use its functionlity of hashing, salting etc.
 
var jwt = require('jsonwebtoken');  // importing jwt to use its functionlity
const JWT_SECRET = 'abshaddpadk';

// creating the user using post '/api/auth/'
router.post('/', [
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
            const authtoken = jwt.sign(data, JWT_SECRET);
            console.log(authtoken);

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

module.exports = router