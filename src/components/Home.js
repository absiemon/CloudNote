import React from 'react';
import { Notes } from './Notes';

const Home = (props)=>{

    return(
        <div className="my-5">
        
        <Notes showAlert={props.showAlert}/>
      </div>
    )
}

export default Home