import React, { Component } from 'react';


class Checkbox extends Component {

  render() {
    const { input, label, meta: { touched, error, warning } } = this.props;
    return (
      <div>
        <div>
          {touched && ((error && <span className="dark-red">{error}</span>) || (warning && <span className="gold">{warning}</span>))}
        </div>
        <div className="checkbox">
          <label>
            <input
              type="checkbox"
              {...input} />
            {label}
          </label>
        </div>
      </div>
    )
  }
}
export default Checkbox
