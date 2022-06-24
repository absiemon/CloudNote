import React, {useContext, useState} from 'react'
import noteContext from '../contexts/notes/noteContext'

export const AddNote = () => {
    
    const context = useContext(noteContext);
    const { addNote} = context;

    const [note, setNote] = useState({title: " ", description: " ", tag: "default "});

    const handleClick =(e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
    }

    // on onChange works whenever we write in the input fields
    const onChange = (e)=>{

        setNote({...note, [e.target.name]:e.target.value}); // setting the state using spread operator(jo bhi vlaue iss note object ke andar hain wo rahe lekin jo properties uske aaage likhi ja rahi hain usse inko add ya override kar dena)
    }
  return (
    <div className="container">
    <h2>Add Your Note</h2>

    <form>
        <div className="form-group">
            <label htmlFor="exampleInputEmail1">title</label>
            <input type="text" className="form-control" id="title" name = "title" aria-describedby="emailHelp" placeholder="Enter title"  onChange={onChange}/>
        </div>
        <div className="form-group">
            <label htmlFor="exampleInputPassword1">description</label>
            <input type="text" className="form-control" id="description" placeholder="description" name ="description" onChange={onChange}/>
        </div>
        <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
    </form>
</div>  )
}
