import React from 'react'
import {useContext, useEffect} from 'react';
import noteContext from '../contexts/notes/noteContext'
import { NoteItem } from './NoteItem';
import { AddNote } from './AddNote';

export const Notes = () => {

    const context = useContext(noteContext);
    const {notes, getNotes} = context;

    useEffect(() => {
      getNotes();

    }, [])
    

  return (
    <>
    <AddNote/>
    <h1>My Notes</h1>
    <div className="row my-3">
        {/* showing up all the notes of the user */}
        {notes.map((note) =>{
            return <NoteItem key={note._id} note={note}/>
        })}
    </div>  
    </>
    )
}
