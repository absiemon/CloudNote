import React from 'react'
import {useContext} from 'react';
import noteContext from '../contexts/notes/noteContext'
import { NoteItem } from './NoteItem';

export const Notes = () => {

    const context = useContext(noteContext);
    const {notes, setNotes} = context;
  return (
    <>
    <h1>My Notes</h1>
    <div className="row my-3">
        {/* showing up all the notes of the user */}
        {notes.map((note) =>{
            return <NoteItem note={note}/>
        })}
    </div>  
    </>
    )
}
