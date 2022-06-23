// we will make a state here

import noteContext from './noteContext';

const NoteState = (props)=>{

    const state = {
        "name":"Abhay",
        "class":"5b"
    }
    return(
        <noteContext.Provider value ={state}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;