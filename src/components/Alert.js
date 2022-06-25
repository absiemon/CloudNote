import React from 'react'

export const Alert= (props)=> {
  return (

    props.alert && <div id ="my-alert" className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
        <strong>{props.alert.type}</strong> : {props.alert.msg}
        {/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>  */}
         {/* we are removing cross button bcz we want ki alert apne aap dismiss ho jaaye kuch seconds baad */}
     </div>


  )
}
