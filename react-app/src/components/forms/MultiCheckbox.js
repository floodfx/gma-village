import React, { Component, PropTypes } from 'react';
import isUndefined from 'lodash/isUndefined';
import isArray from 'lodash/isArray';

class MultiCheckbox extends Component {
  constructor(props) {
    super(props);
    console.log("props", props)
    this.state = {
      selected: props.input.value || [],
      otherTextValue: props.otherTextValue || ''
    }
  }

  handleChange = (event, id) => {
    const {input} = this.props;
    var {selected} = this.state;
    if(event.target.checked) {
      selected.push(id)
    } else {
      selected.splice(selected.indexOf(id), 1);
    }
    this.setState({
      selected
    })

    const otherSelected = selected.includes("OTHER");
    const {name, onOtherValueChange} = this.props;
    if(onOtherValueChange) {
      onOtherValueChange(name, otherSelected ? this.state.otherTextValue : '');
    }
    return input.onChange(selected);
  }

  handleOtherTextValueChange = (event) => {
    const {input} = this.props;
    var otherTextValue = event.target.value;
    this.setState({
      otherTextValue
    })
    const otherSelected = this.state.selected.includes("OTHER");
    const {name, onOtherValueChange} = this.props;
    if (onOtherValueChange) {
      onOtherValueChange(name, otherSelected ? otherTextValue : '');
    }
    return input.onChange(this.state.selected);
  }

  render() {
    const {
      name,
      options,
      heading,
      otherOption,
      input: { value, onChange, onBlur },
      meta: { touched, error, warning }
    } = this.props
    const { selected } = this.state;

    const checkboxes = options.map((option, index) => {
      const isChecked = selected.indexOf(option.id) > -1;

      return (
        <div key={option.id}
          className={"checkbox " + (index === options.length - 1 ? 'mb1' : '')}>
          <label>
            <input
              type="checkbox"
              name={name}
              onChange={event => this.handleChange(event, option.id)}
              onBlur={() => onBlur(selected)}
              checked={isChecked}
              value={option.id}
              />
            {option.label}
          </label>
          {option.id === "OTHER" &&
            <input
              className="ml2 lh-solid"
              type="text"
              name={"other" + name }
              value={this.state.otherTextValue}
              onChange={event => this.handleOtherTextValueChange(event)}
              />
          }
        </div>
      );
    });

    return (
      <div>
        <label className="fw7 f3">{heading}</label>
        <div>
          {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
        {checkboxes}
      </div>
    );
  }
}

MultiCheckbox.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  heading: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  onOtherValueChange: PropTypes.func,
  initialValue: PropTypes.any
};

export default MultiCheckbox;