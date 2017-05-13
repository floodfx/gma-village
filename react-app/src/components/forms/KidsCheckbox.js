import React, { Component } from 'react';

class KidsCheckbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.input.value || [],
    }
  }

  handleChange = (event, optionIndex) => {
    const {input, options} = this.props;
    var {selected} = this.state;
    if(event.target.checked) {
      selected.push(options[optionIndex])
    } else {
      selected.splice(optionIndex, 1);
    }
    this.setState({
      selected
    })
    return input.onChange(selected);
  }

  render() {
    const {
      name,
      options,
      heading,
      input,
      meta: { touched, error, warning },
      disabled
    } = this.props
    const { selected } = this.state;
    const checkboxes = options.map((option, index) => {
      var isChecked = selected.includes(option);
      // var ageComponents = ageFromBirthday(option.birthday);
      const label = `${option.first_name}`
      return (
        <div key={index}
          className={"checkbox " + (index === options.length - 1 ? 'mb1' : '')}>
          <label>
            <input
              type="checkbox"
              name={name}
              onChange={event => this.handleChange(event, index)}
              checked={isChecked}
              value={option.first_name}
              disabled={disabled}
              />
            {label}
          </label>
        </div>
      );
    });

    return (
      <div>
        <label className="fw7 f3">{heading}</label>
        <div>
          {touched && ((error && <span className="dark-red">{error}</span>) || (warning && <span className="gold">{warning}</span>))}
        </div>
        {checkboxes}
      </div>
    );
  }
}

KidsCheckbox.defaultProps = {
  disabled: false
}

export default KidsCheckbox;
