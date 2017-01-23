import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';
import leftPad from 'left-pad';
import {  
  Neighborhood
} from 'gma-village-data-model';
import { normalizePhone } from './forms/Normalize';
import {
  required,
  requiredArray,
  minLength,
  maxLength,
  phone
} from './forms/Validate';
import FontAwesome from 'react-fontawesome';
import MultiRadio from './forms/MultiRadio';
import TextField from './forms/TextField';
import Checkbox from './forms/Checkbox';
import Hidden from './forms/Hidden';
import {
  customSortNeighborhoods
} from './SortHelp';

const otherFieldMap = {
  neighborhood: "otherNeighborhood"  
}

class ParentForm extends Component {
  constructor(props) {
    super(props);
    const { initialValues } = props;
    var kids = [];
    var otherNeighborhood = '';
    if(initialValues) {
      kids = initialValues.kids || [];
      otherNeighborhood = initialValues.otherNeighborhood || '';
    }
    this.state = {
      kids,
      otherNeighborhood,
      kidFirstName: '',
      kidBirthDay: "0",
      kidBirthMonth: "0",
      kidBirthYear: "0",
      validKid: false
    }
  }

  resetKidInput = () => {
    this.setState({
      kidFirstName: '',
      kidBirthDay: "0",
      kidBirthMonth: "0",
      kidBirthYear: "0",
      validKid: false
    })
  }

  componentWillReceiveProps(newProps) {
    const {change, profilePhotoUrl} = this.props;
    if(profilePhotoUrl !== newProps.profilePhotoUrl) {
      change("profilePhotoUrl", newProps.profilePhotoUrl);
    }
  }

  removeKid = (index) => {
    this.setState((prevState, props) => ({
      kids: [...prevState.kids.slice(0, index), ...prevState.kids.slice(index+1)]
    }));    
  }

  addKid = () => {
    const m = leftPad(this.state.kidBirthMonth, 2, '0');
    const d = leftPad(this.state.kidBirthDay, 2, '0');
    const newKid = {
      first_name: this.state.kidFirstName,
      birthday: moment(`${m}-${d}-${this.state.kidBirthYear}`, 'MM-DD-YYYY').unix()
    }
    this.setState((prevState, props) => {
      const newKids = prevState.kids.concat([newKid]);
      this.props.change("kids", newKids);
      return {
        kids: newKids
      }
    }); 
    this.resetKidInput()
  }

  kidValueChange = (kidPart, value) => {
    switch(kidPart) {
      case "kidFirstName":
      this.setState({kidFirstName: value});
      break;
      case "kidBirthDay":
      this.setState({kidBirthDay: value});
      break;
      case "kidBirthMonth":
      this.setState({kidBirthMonth: value});
      break;
      case "kidBirthYear":
      this.setState({kidBirthYear: value});
      break;
    }      
    this.checkValidKid();
  }

  checkValidKid = () => {
    this.setState((prevState, props) => {
      const validKid = (prevState.kidFirstName.length > 1 && 
                        prevState.kidBirthDay !== "0" && 
                        prevState.kidBirthMonth !== "0" && 
                        prevState.kidBirthYear !== "0")      
      return {
        validKid
      }
    });
  }

  onOtherValueChange = (name, value) => {
    const otherField = otherFieldMap[name];
    this.props.change(otherField, value);
  }

  render() {
    const { 
      handleSubmit, 
      handleFile, 
      pristine, 
      invalid, 
      submitting,
      heading
    } = this.props
    const { kids, otherNeighborhood } = this.state;
    const days = [...Array(31)].map((v, i) => i + 1);
    const months = [...Array(12)].map((v, i) => i + 1);
    const years = [...Array(13)].map((v, i) => i + 1);
    const year = moment().year()
    return (
      <div>
        <h2 className="lh-title fw2 f2">{heading}</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            <Field
              label="Hi, My name is:"
              name="first_name"
              component={TextField}
              type="text"
              placeholder="First Name"
              validate={[required, minLength(2), maxLength(20)]} />            
          </div>
          <div className="mt4">
            <Field
              label="My last name is:"
              name="last_name"
              component={TextField}
              type="text"
              placeholder="Last Name"
              validate={[required, minLength(2), maxLength(30)]} />
          </div>
          <div className="mt4">
            <Field
              label="My phone # is:"
              name="phone"
              component={TextField}
              type="text"
              placeholder="Phone Number"
              normalize={normalizePhone}
              validate={[required, phone]} />
          </div>
          <div className="mt4">          
            <Field
              label="My Children:"
              name="kids"
              component={Hidden}
              validate={[requiredArray]} />
            {kids.length > 0 &&
              <ul>
                {kids.map((kid, index) => {              
                  return (
                    <li key={index} className="ph3 pv2">
                      {kid.first_name} (born: {moment.unix(kid.birthday).format("MM-DD-YYYY")}) 
                      <button type="button" className="btn btn-sm gma-orange-bg ml2" onClick={() => this.removeKid(index)}>
                        <FontAwesome name="trash"/>
                      </button>
                    </li>
                  )
                })}
              </ul>  
            }
            <div>
              <div className="dt">
                <div className="dtc">
                  <label className="normal mh2">Child First Name:</label>
                </div>
                <div className="dtc">
                  <input type="text" value={this.state.kidFirstName} name="kid_first_name" onChange={(e) => this.kidValueChange("kidFirstName", e.target.value)} />
                </div>
              </div>
              <div className="dt">
                <div className="dtc">
                  <label className="normal mh2">Child Birth Date:</label>
                </div>
                <div className="dtc">
                  <select value={this.state.kidBirthMonth} onChange={(e) => this.kidValueChange("kidBirthMonth", e.target.value)}>
                    <option value={0}>Month</option>
                    {months.map((month, index) => {
                      return <option key={index} value={month}>{leftPad(month, 2, 0)}</option>
                    })}                  
                  </select>
                  <select value={this.state.kidBirthDay} onChange={(e) => this.kidValueChange("kidBirthDay", e.target.value)}>
                    <option value={0}>Day</option>
                    {days.map((day, index) => {
                      return <option key={index} value={day}>{leftPad(day, 2, 0)}</option>
                    })}                    
                  </select>
                  <select value={this.state.kidBirthYear} onChange={(e) => this.kidValueChange("kidBirthYear", e.target.value)}>
                    <option value={0}>Year</option>
                    {years.map((yr, index) => {
                      return <option key={index} value={year-index}>{year-index}</option>
                    })}                   
                  </select>
                </div>
              </div>
            </div>             
            <div>
              <button 
                className="btn btn-sm gma-orange-bg" 
                type="button" 
                disabled={!this.state.validKid}
                onClick={() => this.addKid()}>
                <FontAwesome name="plus" className="ml1" /> Add Child
              </button>
            </div>
          </div>
          <div className="mt4">
            <Field
              heading="I live in:"
              name="neighborhood"
              options={Neighborhood.enumValues.slice(0).sort(customSortNeighborhoods).map((val) => { return { id: val.name, label: val.text } })}
              component={MultiRadio}
              otherTextValue={otherNeighborhood}
              onOtherValueChange={this.onOtherValueChange}
              />          
          </div>
          <div className="mt4">
            <label>Profile Photo:</label>
            <div>
              <Field 
                name="profilePhoto" 
                component="input" 
                type="file" 
                onChange={(e) => handleFile(e)} />
            </div>          
          </div>  
          <div className="mt4">
            <Field
              label="Active:"
              name="active"
              component={Checkbox}
              type="checkbox" />
          </div>      
          <Field name="otherNeighborhood" component="input" type="hidden" />
          <Field name="kind" component="input" type="hidden" />
          <Field name="profilePhotoUrl" component="input" type="hidden" value={this.props.profilePhotoUrl} />
          <div className="mt4">
            <button className="btn gma-orange-bg" type="submit" disabled={pristine || submitting || invalid}>
              {this.props.saving &&
                <FontAwesome name='spinner' spin={true} className="mr1"/>
              }
              Submit
            </button>
          </div>
        </form>
      </div>
    )
  }
}

const validateOthers = values => {
  const errors = {}

  if (!values.neighborhood && !values[otherFieldMap]) {
    errors.neighborhood = 'Required'
  } else if (values.neighborhood === Neighborhood.OTHER.name && !values.otherNeighborhood) {
    errors.neighborhood = "Please provide 'Other' text"
  } else if (values.neighborhood === Neighborhood.OTHER.name && values.otherNeighborhood && values.otherNeighborhood.length < 2) {
    errors.neighborhood = "'Other' text be at least 2 characters"
  }  

  return errors
}

ParentForm = reduxForm({
  form: 'parentForm',   // a unique identifier for this form
  validate: validateOthers
})(ParentForm)

export default ParentForm;