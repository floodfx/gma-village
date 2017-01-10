import React, { Component } from 'react';


class Checkbox extends Component {

  render() {
    const { input, label, meta: { touched, error, warning } } = this.props;
    return (
      <div>
        <label className="fw7 f3">{label}</label>
        <div>
          {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
        <div className="checkbox">
          <label>
            <input 
              type="checkbox" 
              {...input} />
            Yes
          </label>
        </div>
      </div>
    )
  }
}
export default Checkbox