import React from 'react'
import { useContext } from 'react';

// importing context to use in the component
import noteContext from '../contexts/notes/noteContext';

const About = ()=>{
    const a = useContext(noteContext);

    return(
      <>
      <h1>
        {/*using context */}

        This is me {a.name} from About Component
      </h1>
      </>
    )
}

export default About