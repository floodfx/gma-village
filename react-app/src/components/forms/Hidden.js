import React, { Component } from 'react';


class Hidden extends Component {
  render() {
    const { input, label, meta: { touched, error, warning } } = this.props;
    return (
      <div>
        <label className="fw7 f3">{label}</label>
        <div>
          {touched && ((error && <span className="dark-red">{error}</span>) || (warning && <span className="gold">{warning}</span>))}
        </div>
        <input 
          type="hidden" 
          {...input} />
      </div>
    )
  }
}
export default Hidden