import React, { Component } from 'react';


class TextField extends Component {
  render() {
    const { input, label, placeholder, meta: { touched, error, warning } } = this.props;
    return (
      <div>
        <label className="fw7 f3">{label}</label>
        <div>
          <input
            type="text"
            placeholder={placeholder}
            {...input} />
          {touched && ((error && <span className="dark-red">{error}</span>) || (warning && <span className="gold">{warning}</span>))}
        </div>
      </div>
    )
  }
}
export default TextField