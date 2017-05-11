import React, { Component } from 'react';


class TextArea extends Component {
  render() {
    const { input, label, placeholder, meta: { touched, error, warning } } = this.props;
    console.log("input.name", input.name, "input.value", input.value)
    return (
      <div>
        <label className="fw7 f3">{label}</label>
        <div>
          {touched && ((error && <span className="dark-red">{error}</span>) || (warning && <span className="gold">{warning}</span>))}
        </div>
        <div>
          <textarea
            className="w-40-ns w-100 h5"
            name={name}
            placeholder={placeholder}
            {...input} />
        </div>
      </div>
    )
  }
}
export default TextArea
