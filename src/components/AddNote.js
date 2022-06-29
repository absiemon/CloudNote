import React, { useContext, useState } from 'react'
import noteContext from '../contexts/notes/noteContext'

export const AddNote = (props) => {

    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: " ", description: " ", tag: " " });

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);


        //after adding the note blank the input field
        setNote({ title: " ", description: " ", tag: " " });
        props.showAlert("Notes added successfully", "success");
    }

    // on onChange works whenever we write in the input fields
    const onChange = (e) => {

        setNote({ ...note, [e.target.name]: e.target.value }); // setting the state using spread operator(jo bhi vlaue iss note object ke andar hain wo rahe lekin jo properties uske aaage likhi ja rahi hain usse inko add ya override kar dena)
    }
    return (
        <div className="container">
            <h2>Add Your Note</h2>

            <form>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" placeholder="Enter title" onChange={onChange} value={note.title} />
                </div>
                {/* <div className="form-group">
                    <label htmlFor="exampleInputPassword1">description</label>
                    <textarea type="text" className="form-control" id="description" row="5" placeholder="description" name="description" onChange={onChange} value={note.description}></textarea>
                </div> */}
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="5 " name="description" onChange={onChange} value={note.description}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="tag">tag</label>
                    <input type="text" className="form-control" id="tag" placeholder="tag" name="tag" onChange={onChange} value={note.tag} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>)
}
