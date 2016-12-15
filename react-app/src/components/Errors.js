import React, { Component } from 'react';

const Errors = ({errors}) => {

  if(errors.length > 0) {
    return (
      <div>
        <span className="b">Errors:</span>
        {errors.map((error) => {
          return <p key={error} className="">{error}</p>
        })}
      </div>
    )
  } else {
    return null
  }

}

export default Errors
