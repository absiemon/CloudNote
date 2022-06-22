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
        res.status(500).send("Internal Server error try after some time ");
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
        res.status(500).send("Internal Server error try after some time ");
    }

})

// ROUTE-3: Update the notes of logged in user using PUT req on api/notes/update .

router.put('/update/:id', fetchuser, async (req, res)=>{
    
    try{
        
        const {title, description, tag} = req.body;
    
        // create a new note object 
        const newNote = {};
        // title, description, tag is availabel then append to the newNote
        if(title){ newNote.title = title};
        if(description){ newNote.description = description};
        if(tag){ newNote.tag = tag};

        // find the note and update it
        let note =  await Notes.findById(req.params.id);    // whatever the id is comming from the params , that you have to find

        // if the note that has to be updated is not exiests
        if(!note){
           return res.status(404).send({ message: "Note not found" });
        }
        
        // check whether the same user is updating the note 
        // whenver user creating the note user id bhi note main append ho jaa rahi hain. means note has the userid
        if(note.user.toString()  !== req.user.id) {          // fetchuser will give req.user.id 
            return res.status(401).send("Unauthorized access");
        }
    
        // if everythig is fine then update the note
        note = await Notes.findByIdAndUpdate( req.params.id, {$set: newNote}, {new: true});
        res.json(note);

    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server error try after some time ");
    }

})

// ROUTE-3: Delete the notes of logged in user using DELETE req on api/notes/delete .
router.delete('/delete/:id', fetchuser, async (req, res)=>{

    try{
        //check whether the note is availabe with given id or not
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Notes not found");
        }
        // we need to verify that the user that is deleting the note is same as the logged in user

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Unauthorized action");
        }
        // find and delete the note 
        note = await Notes.findByIdAndDelete( req.params.id);
        res.json({"success":"note has been deleted"});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server error occured try after some time ");
    }
})
module.exports = router;   