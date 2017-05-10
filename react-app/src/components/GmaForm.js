import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  Availability,
  CareAge,
  CareExperience,
  CareLocation,
  CareTraining,
  Demeanor,
  Neighborhood
} from 'gma-village-data-model'
import { normalizePhone } from './forms/Normalize'
import {
  required,
  minLength,
  maxLength,
  phone
} from './forms/Validate';
import FontAwesome from 'react-fontawesome';
import MultiCheckbox from './forms/MultiCheckbox';
import MultiRadio from './forms/MultiRadio';
import TextField from './forms/TextField';
import TextArea from './forms/TextArea';
import Checkbox from './forms/Checkbox';
import {
  customSortNeighborhoods
} from './SortHelp';
import ElsewhereLearnMore from './ElsewhereLearnMore';

const otherFieldMap = {
  neighborhood: "other_neighborhood",
  availabilities: "other_availability",
  demeanors: "other_demeanor",
  care_experiences: "other_care_experience",
  care_trainings: "other_care_training"
}

class GmaForm extends Component {

  componentWillReceiveProps(newProps) {
    const {change, profilePhotoUrl} = this.props;
    if(profilePhotoUrl !== newProps.profilePhotoUrl) {
      change("profilePhotoUrl", newProps.profilePhotoUrl);
    }
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
      heading,
      initialValues,
      saving,
      currentUser,
      profilePhotoUrl
     } = this.props
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
              placeholder="Last Name" />
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
              heading="I live in:"
              name="neighborhood"
              options={Neighborhood.enumValues.slice(0).sort(customSortNeighborhoods).map((val) => { return { id: val.name, label: val.text } })}
              component={MultiRadio}
              otherTextValue={initialValues.other_neighborhood}
              onOtherValueChange={this.onOtherValueChange}
              />          
          </div>
          <div className="mt4">
            <Field
              label="I can care for kids outside my area:"
              name="isAvailableOutsideNeighborhood"
              component={Checkbox}
              type="checkbox" />
          </div> 
          <div className="mt4">
            <Field
              heading="I am comfortable caring for kids ages:"
              name="care_ages"
              options={CareAge.enumValues.map((val) => { return { id: val.name, label: val.text } })}
              component={MultiCheckbox} 
              validate={[required]}/>
          </div>
          <div className="mt4">
            <Field
              heading="I am generally available:"
              name="availabilities"
              options={Availability.enumValues.map((val) => { return { id: val.name, label: val.text } })}
              component={MultiCheckbox}
              otherTextValue={initialValues.other_availability}
              onOtherValueChange={this.onOtherValueChange} />          
          </div>
          <div className="mt4">
            <Field
              heading="I can provide child care at:"
              name="care_locations"
              options={CareLocation.enumValues.slice(0).reverse().map((val) => { 
                var text = val.name === "PROVIDERS_HOME" ? "My Home" : "Elsewhere"
                return { id: val.name, label: text 
              }})}
              component={MultiCheckbox} 
              validate={[required]}/>
              <ElsewhereLearnMore />
          </div>
          <div className="mt4">
            <Field
              heading="I would describe myself as:"
              name="demeanors"
              options={Demeanor.enumValues.map((val) => { return { id: val.name, label: val.text } })}
              component={MultiCheckbox}
              otherTextValue={initialValues.other_demeanor}
              onOtherValueChange={this.onOtherValueChange} />
          </div>
          <div className="mt4">
            <Field
              label="I enjoy caring for kids because:"
              name="whyCareForKidsText"
              component={TextArea}
              validate={[required]} />
          </div>
          <div className="mt4">
            <Field
              heading="Experience:"
              name="care_experiences"
              options={CareExperience.enumValues.map((val) => { return { id: val.name, label: val.text } })}
              component={MultiCheckbox}
              otherTextValue={initialValues.other_care_experience}
              onOtherValueChange={this.onOtherValueChange} />
          </div>
          <div className="mt4">
            <Field
              disabled={currentUser.kind !== "Admin"}
              heading="Trainings:"
              name="care_trainings"
              options={CareTraining.enumValues.map((val) => { return { id: val.name, label: val.text } })}
              component={MultiCheckbox}
              otherTextValue={initialValues.other_care_training}
              onOtherValueChange={this.onOtherValueChange} />            
          </div>
          <div className="mt4">
            <Field
              label="Something else I would like to share:"
              name="additionalInformationText"
              component={TextArea}
              validate={[required]} />
          </div>
          <div className="mt4">
            <label>Profile Photo:</label>
            {profilePhotoUrl &&
              <div>
                <img 
                className="w-100 w-20-ns gma-orange-border" 
                src={profilePhotoUrl} 
                style={{
                  objectFit: 'cover'
                }}/>
              </div>
            }    
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
              defaultValue={true}
              component={Checkbox}
              type="checkbox" />
          </div>
          <Field name="other_neighborhood" component="input" type="hidden" />          
          <Field name="other_availability" component="input" type="hidden" />
          <Field name="other_demeanor" component="input" type="hidden" />
          <Field name="other_care_experience" component="input" type="hidden" />
          <Field name="other_care_training" component="input" type="hidden" />  
          <Field name="kind" component="input" type="hidden"/>  
          <Field name="city" component="input" type="hidden"/>  
          <Field name="profilePhotoUrl" component="input" type="hidden" value={this.props.profilePhotoUrl} />
          <div className="mt4">
            <button className="btn gma-orange-bg" type="submit" disabled={pristine || submitting || invalid}>
              {saving &&
                <FontAwesome name='spinner' spin={true} className="mr1"/>
              }
              Save
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
  } else if (values.neighborhood === Neighborhood.OTHER.name && !values.other_neighborhood) {
    errors.neighborhood = "Please provide 'Other' text"
  } else if (values.neighborhood === Neighborhood.OTHER.name && values.other_neighborhood && values.other_neighborhood.length < 2) {
    errors.neighborhood = "'Other' text be at least 2 characters"
  }

  if (!values.availabilities && !values.other_availability) {
    errors.availabilities = 'Required'
  } else if (values.availabilities.includes(Availability.OTHER.name) && !values.other_availability) {
    errors.availabilities = "Please provide 'Other' text"
  } else if (values.availabilities.includes(Availability.OTHER.name) && values.other_availability && values.other_availability.length < 2) {
    errors.availabilities = "'Other' text be at least 2 characters"
  }

  if (!values.demeanors && !values.other_demeanor) {
    errors.demeanors = 'Required'
  } else if (values.demeanors.includes(Demeanor.OTHER.name) && !values.other_demeanor) {
    errors.demeanors = "Please provide 'Other' text"
  } else if (values.demeanors.includes(Demeanor.OTHER.name) && values.other_demeanor && values.other_demeanor.length < 2) {
    errors.demeanors = "'Other' text be at least 2 characters"
  }

  if (!values.care_experiences && !values.other_care_experience) {
    errors.care_experiences = 'Required'
  } else if (values.care_experiences.includes(CareExperience.OTHER.name) && !values.other_care_experience) {
    errors.care_experiences = "Please provide 'Other' text"
  } else if (values.care_experiences.includes(CareExperience.OTHER.name) && values.other_care_experience && values.other_care_experience.length < 2) {
    errors.care_experiences = "'Other' text be at least 2 characters"
  }

  if (!values.care_trainings && !values.other_care_training) {
    errors.care_trainings = 'Required'
  } else if (values.care_trainings.includes(CareTraining.OTHER.name) && !values.other_care_training) {
    errors.care_trainings = "Please provide 'Other' text"
  } else if (values.care_trainings.includes(CareTraining.OTHER.name) && values.other_care_training && values.other_care_training.length < 2) {
    errors.care_trainings = "'Other' text be at least 2 characters"
  }

  return errors
}

GmaForm = reduxForm({
  form: 'gmaForm',   // a unique identifier for this form
  validate: validateOthers
})(GmaForm)

export default GmaForm;


