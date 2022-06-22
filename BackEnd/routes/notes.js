const express = require('express');
const router = express.Router();

const { body, validationResult } = require('express-validator');  // express validator use to validate user details that he want to send to the database.

const Notes  = require('../models/Notes');
var fetchuser = require('../middleware/fetchUser');

// ROUTE-1: get all the notes of logged in user using get req on api/notes/fetchallnotes.

router.get('/fetchallnotes', fetchuser, async (req, res)=>{

    try {
        
        //fetching all the notes from the database
        const notes = await Notes.find({user: req.user.id});  // req.user.id will be given by fetchuser middleware
        res.json(notes); 

    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
    }

})

// ROUTE-2: To save the notes of logged in user using POST req on api/notes/addnote .
// we will use express validator to validate that the user has entered all the fields while adding the notes.

router.post('/addnote', fetchuser, [
    body('title', 'Please enter the valid title').isLength({min: 3}),
    body('description', 'Description must be at least 5 characters').isLength({ min: 5}),

], async (req, res)=>{

    try {
     // checking if any error occured then send the error in json object. error json has msg prop.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const {title, description, tag} = req.body;

        const note = new Notes({         // making a new note of type NOtes schema and returning a promise
            title, description, tag, user : req.user.id 

        })
        const savedNote = await note.save();  // wait for the user to save the note
        res.json(savedNote); 
   
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
    }

})
module.exports = router;   