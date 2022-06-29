import React from 'react'
import { useContext, useEffect, useRef, useState } from 'react';  // with the help of useRef hook you can give a reference to an element
import noteContext from '../contexts/notes/noteContext'
import { NoteItem } from './NoteItem';
import { AddNote } from './AddNote';
import { useNavigate } from 'react-router-dom';

export const Notes = (props) => {

    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    let navigate = useNavigate();

    useEffect(() => {
        // if token is not null
        if (localStorage.getItem('token')) {
            getNotes();
        }
        else {
            navigate('/login')
        }

    }, [getNotes, navigate])

    const ref = useRef(null)  // using use ref
    const refClose = useRef(null);  // this ref refers to close, we are making bcz when we click on update note we want to close the modal.

    const [note, setNote] = useState({ _id: " ", title: " ", description: " ", tag: " " });

    const updateNote = (currentNote) => {
        ref.current.click()  // bootstrap class to toggle a current element in which ref has been declared
        setNote(currentNote);
    }

    const saveUpdatedNote = () => {
        editNote(note._id, note.title, note.description, note.tag)
        refClose.current.click();
        props.showAlert("Note updated successfully", "success");

    }
    // on onChange works whenever we write in the input fields
    const onChange = (e) => {

        setNote({ ...note, [e.target.name]: e.target.value }); // setting the state using spread operator(jo bhi vlaue iss note object ke andar hain wo rahe lekin jo properties uske aaage likhi ja rahi hain usse inko add ya override kar dena)
    }
    return (
        <>
            <AddNote showAlert={props.showAlert} />
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* add note form here */}
                            <form>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">title</label>
                                    <input type="text" className="form-control" id="etitle" name="title" aria-describedby="emailHelp" placeholder="Enter title" onChange={onChange} value={note.title} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">description</label>
                                    <input type="text" className="form-control" id="edescription" placeholder="description" name="description" onChange={onChange} value={note.description} />
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="tag">tag</label>
                                    <input type="text" className="form-control" id="etag" placeholder="tag" name="tag" onChange={onChange} value={note.tag} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={saveUpdatedNote}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <h1>My Notes</h1>
            <div className="row my-3">
                <div className="container">
                    {notes.length === 0 && "No notes to be displayed. Try adding some notes"}
                </div>
                {/* showing up all the notes of the user */}
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
                })}
            </div>
        </>
    )
}
