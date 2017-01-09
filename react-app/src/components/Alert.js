import React from 'react';


const Alert = ({heading, text, type}) => (
  <div className={"alert alert-dismissible alert-"+type} role="alert">
    <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <strong>{heading}</strong> {text}
  </div>
)

export default Alert;