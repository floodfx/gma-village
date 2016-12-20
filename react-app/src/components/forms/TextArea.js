import React, { Component } from 'react';


class TextArea extends Component {
  render() {
    const { input, label, placeholder, type, meta: { touched, error, warning } } = this.props;
    return (
      <div>
        <label className="fw7 f3">{label}</label>
        <div>
          {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
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