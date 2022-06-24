// we will make a state here
import React, {useState} from 'react';
import noteContext from './noteContext';

const NoteState = (props)=>{

    const notesinitial  = [
    {
      "_id": "62b5389e73622017353a5937",
      "user": "62b1a7df2bbfe5090782f47c",
      "title": "myTitle",
      "description": "plaese add the description",
      "tag": "personal",
      "date": "2022-06-24T04:07:58.686Z",
      "__v": 0
    },
    {
      "_id": "62b538e073622017353a5939",
      "user": "62b1a7df2bbfe5090782f47c",
      "title": "myTitle1",
      "description": "plaese add the description1",
      "tag": "personal",
      "date": "2022-06-24T04:09:04.739Z",
      "__v": 0
    },
    {
      "_id": "62b538ff73622017353a593b",
      "user": "62b1a7df2bbfe5090782f47c",
      "title": "myTitle2",
      "description": "plaese add the description2",
      "tag": "personal",
      "date": "2022-06-24T04:09:35.640Z",
      "__v": 0
    }
  ]

  //using useState hook to set state
  const [notes, setNotes] = useState(notesinitial);
    return(
        <noteContext.Provider value ={{notes, setNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;