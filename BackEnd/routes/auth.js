const express = require('express');
const router = express.Router();
const User  = require('../models/User');

const { body, validationResult } = require('express-validator');  // express validator use to validate user details that he want to send to the database.

// creating the user using post '/api/auth/'
router.post('/', [
    // express validator work
    // name must be at least 5 chars long
    body('name', 'Enter the valid name').isLength({ min: 5 }),
    body('email', 'Enter the valid email address').isEmail(),
    body('password', 'password must be atleast 5 characters long').isLength({ min: 5 }),
],
    (req, res)=>{
        // checking if any error occured then send the error in json object. error json has msg prop.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
          }).then(user => res.json(user)).
          catch(err => { console.log(err); 
                        res.json({ error: 'this email already exists'});
          });

    // console.log(req.body);
    // const user = User(req.body);
    // user.save();   // saving the user into the database
    // res.send(req.body); 
})

module.exports = router