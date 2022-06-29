// we will make a state here
import React, {useState} from 'react';
import noteContext from './noteContext';

const NoteState = (props)=>{

  const host = "http://localhost:2000"  // host may be variable

  const notesinitial  = [ ];

  //using useState hook to set state
  const [notes, setNotes] = useState(notesinitial);

  // Get All Notes Function
  const getNotes = async () => {
    //API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.

      headers: {
        'Content-Type': 'application/json',
        'auth-token' : localStorage.getItem('token')

      }
    });
    const json = await response.json();
    setNotes(json)
  }


  // Add Notes Function
  const addNote = async (title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.

      headers: {
        'Content-Type': 'application/json',
        'auth-token' : localStorage.getItem('token')

      },
      body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
    });

    const note = await response.json();
    setNotes(notes.concat(note));   //push the note in the notes array and update the state setNotes; notes.concat returns a new array.
  }

  //----Delete a Note-----
  const deleteNote = async (id)=>{

    const response = await fetch(`${host}/api/notes/delete/${id}`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.

      headers: {
        'Content-Type': 'application/json',
        'auth-token' : localStorage.getItem('token')

      },
    });
    // const json =  response.json(); 
    // console.log(json);    
    const newNote = await notes.filter((note) =>{ return note._id !== id});
    setNotes(newNote);  
  }
  
  //Edit a Note
  const editNote = async (id , title, description, tag)=>{

        //API call to our own server
    const response = await fetch(`${host}/api/notes/update/${id}`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.

      headers: {
        'Content-Type': 'application/json',
        'auth-token' : localStorage.getItem('token')

      },
      body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
    });
    const json =  await response.json(); 
    
    let newNotes = JSON.parse(JSON.stringify(notes));   // updating the state by making a newNote
    //logic to edit a note
    for(let index =0; index< newNotes.length; index++){

      const element = newNotes[index];
      if(element._id ===id){

        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes );
  }

    return(
        <noteContext.Provider value ={{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;