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
        'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiMWE3ZGYyYmJmZTUwOTA3ODJmNDdjIn0sImlhdCI6MTY1NTg3NTM5NX0.E2-gsAVa3IaL8PDg1VO0lU-8PC1pDrAa1TYb45fGd-s'

      }
    });
    const json = await response.json();
    console.log(json)
    setNotes(json)
  }


  // Add Notes Function
  const addNote = async (title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.

      headers: {
        'Content-Type': 'application/json',
        'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiMWE3ZGYyYmJmZTUwOTA3ODJmNDdjIn0sImlhdCI6MTY1NTg3NTM5NX0.E2-gsAVa3IaL8PDg1VO0lU-8PC1pDrAa1TYb45fGd-s'

      },
      body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
    });

    console.log("Added a note");
    const note = {
      "_id": "62b538ff73622017353a593b",
      "user": "62b1a7df2bbfe5090782f47c",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2022-06-24T04:09:35.640Z",
      "__v": 0
    }
    setNotes(notes.concat(note));   //push the note in the notes array and update the state setNotes; notes.concat returns a new array.
  }

  //----Delete a Note-----
  const deleteNote = async (id)=>{


    console.log("deleting the note with id "+ id);
    const newNote = notes.filter((note) =>{ return note._id !== id});
    setNotes(newNote);  
  }
  
  //Edit a Note
  const editNote = async (id , title, description, tag)=>{

        //API call to our own server
    
    const response = await fetch(`${host}/api/notes/update/${id}`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.

      headers: {
        'Content-Type': 'application/json',
        'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiMWE3ZGYyYmJmZTUwOTA3ODJmNDdjIn0sImlhdCI6MTY1NTg3NTM5NX0.E2-gsAVa3IaL8PDg1VO0lU-8PC1pDrAa1TYb45fGd-s'

      },
      body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
    });
    const json =  response.json(); 
    
    //logic to edit a note
    for(let index =0; index< notes.index; index++){
      const element = notes[index]
      if(element._id ===id){

        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  }

    return(
        <noteContext.Provider value ={{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;