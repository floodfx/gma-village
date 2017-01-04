import React, { Component } from 'react';


class Hidden extends Component {
  render() {
    const { input, label, meta: { touched, error, warning } } = this.props;
    return (
      <div>
        <label className="fw7 f3">{label}</label>
        <div>
          {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
        <input 
          type="hidden" 
          {...input} />
      </div>
    )
  }
}
export default Hidden