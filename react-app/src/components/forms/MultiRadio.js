import React, { Component, PropTypes } from 'react';
import isUndefined from 'lodash/isUndefined';
import isArray from 'lodash/isArray';

class MultiRadio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: props.initialValue,
      otherTextValue: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleOtherTextValueChange = this.handleOtherTextValueChange.bind(this);
  }

  handleChange(event, selected) {
    const {input} = this.props;
    this.setState({
      selected    
    })
    const otherSelected = selected === "OTHER"
    const {name, onOtherValueChange} = this.props;
    if(onOtherValueChange) {
      onOtherValueChange(name, otherSelected ? this.state.otherTextValue : '');
    }
    return input.onChange(selected);
  }

  handleOtherTextValueChange(event) {
    const {input} = this.props;
    var otherTextValue = event.target.value;
    this.setState({
      otherTextValue
    })
    const otherSelected = this.state.selected === "OTHER"
    const {name, onOtherValueChange} = this.props;
    if(onOtherValueChange) {
      onOtherValueChange(name, otherSelected ? otherTextValue : '');
    }
    return input.onChange(this.state.selected);
  }

  render() {
    const {
      name,
      options,
      heading,
      input: { value, onChange, onBlur },
      meta: { touched, error, warning }
    } = this.props
    const { selected } = this.state;

    const radios = options.map((option, index) => {
      const isChecked = selected === option.id;

      return (
        <div key={option.id}
          className={"radio " + (index === options.length - 1 ? 'mb1' : '')}>
          <label>
            <input
              type="radio"
              name={name}
              onChange={event => this.handleChange(event, option.id)}
              onBlur={() => onBlur(value)}
              checked={isChecked}
              value={option.id}
              />
            {option.label}
          </label>
          {option.id === "OTHER" &&
            <input
              className="ml2 lh-solid"
              type="text"
              name={"other" +  name }
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
        {radios}
      </div>
    );
  }
}

MultiRadio.propTypes = {
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

export default MultiRadio;