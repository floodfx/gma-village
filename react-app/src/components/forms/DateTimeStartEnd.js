import React, { Component, PropTypes } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

require('react-datepicker/dist/react-datepicker.css');

class DateTimeStartEnd extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: moment().add(1, "day"),
      dateMin: moment().add(1, 'day'),
      dateMax: moment().add(15, "days"),
      startTime: -1, // noon
      endTime: -1, // 1pm
    }
  }

  handleDateChange = (date) => {
    this.setState({
      date
    })    
  }

  handleTimeChange = (timeId, timeValueInMinutes) => {
    var timeMoment;
    if(this.state.date && timeValueInMinutes > 0) {      
      timeMoment = moment(this.state.date).startOf('day').add(timeValueInMinutes, 'minutes')      
    }
    if(timeId === "startTime") {
      this.setState({
        startTime: timeValueInMinutes
      })
      this.props.onStartDateTimeValueChange(timeMoment);
    } else if(timeId === "endTime") {
      this.setState({
        endTime: timeValueInMinutes
      })
      this.props.onEndDateTimeValueChange(timeMoment);
    } 
  }

  getTimeForSelects = () => {
    var day = moment(this.state.date);
    const tomorrow = moment().add(1, 'day');
    // if selected day is tomorrow -- ensure 24 hours limit
    if(day.format("YYYY-MM-DD") !== tomorrow.format("YYYY-MM-DD")) {
      day.startOf('day')
    }
    // round to fifteen minute intervals
    if(day.minutes() <= 15) {
      day.minutes(15);
    } else if(day.minutes() <= 30) {
      day.minutes(30);
    } else if(day.minutes() <= 45) {
      day.minutes(45);
    } else {
      day.add(1, 'hour').startOf('hour');
    }

    const date = day.format("DD");
    var timeForSelects = {}
    // start minutes at number of minutes into the day that we are
    var minutes = day.diff(moment(day).startOf('day'), 'minutes');
    while(day.format("DD") === date) {
      timeForSelects[day.format("hh:mm a")] = minutes;
      minutes += 15;
      day.add(15, 'minutes')
    }
    return timeForSelects;
  }

  render() {
    const { input, heading, placeholder, meta: { touched, error, warning } } = this.props;
    console.log("props", this.props)
    const timeForSelects = this.getTimeForSelects();
    return (
      <div>
        <label className="fw7 f3">{heading}</label>
        <label className="fw3 f4 ml2">(must be at least <span className="underline">24 hours</span> from now)</label>
        {touched && ((error && <p>{error}</p>) || (warning && <p>{warning}</p>))}
        <div>
          <span className="fw3 f4 mr2">Date</span>
          <DatePicker
            selected={this.state.date}
            onChange={this.handleDateChange}
            minDate={this.state.dateMin}
            maxDate={this.state.dateMax}
            placeholder={placeholder}
          />
          <span className="fw3 f4 mr2 ml3">Starting at</span>
          <select {...input} value={this.state.startTime} onChange={(e) => this.handleTimeChange("startTime", e.target.value)}>
            <option value={-1}>Choose</option>
            {Object.keys(timeForSelects).map((key, index) => {
              const value = timeForSelects[key];
              return <option key={index} value={value}>{key}</option>
            })}                  
          </select>
          <span className="fw3 f4 mr2 ml3">Ending at</span>
          <select {...input} value={this.state.endTime} onChange={(e) => this.handleTimeChange("endTime", e.target.value)}>
            <option value={-1}>Choose</option>
            {Object.keys(timeForSelects).map((key, index) => {
              const value = timeForSelects[key];
              return <option key={index} value={value}>{key}</option>
            })}                  
          </select>          
        </div>
      </div>
    )
  }
}

DateTimeStartEnd.propTypes = {
  placeholder: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  onStartDateTimeValueChange: PropTypes.func,
  onEndDateTimeValueChange: PropTypes.func  
};

export default DateTimeStartEnd