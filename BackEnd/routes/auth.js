const express = require('express');
const router = express.Router();

const User  = require('../models/User');

// creating the user using post '/api/auth/'
router.post('/', (req, res)=>{

    console.log(req.body);
    const user = User(req.body);
    user.save();   // saving the user into the database
    res.send(req.body);
})

module.exports = router