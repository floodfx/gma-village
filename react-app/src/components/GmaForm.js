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

const otherFieldMap = {
  neighborhood: "otherNeighborhood",
  availabilities: "otherAvailability",
  demeanors: "otherDemeanor",
  careExperiences: "otherCareExperience",
  careTrainings: "otherCareTraining"
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
      currentUser
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
              otherTextValue={initialValues.otherNeighborhood}
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
              name="careAges"
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
              otherTextValue={initialValues.otherAvailability}
              onOtherValueChange={this.onOtherValueChange} />          
          </div>
          <div className="mt4">
            <Field
              heading="I can provide child care at:"
              name="careLocations"
              options={CareLocation.enumValues.slice(0).reverse().map((val) => { 
                var text = val.name === "PROVIDERS_HOME" ? "My Home" : "Elsewhere"
                return { id: val.name, label: text 
              }})}
              component={MultiCheckbox} 
              validate={[required]}/>
          </div>
          <div className="mt4">
            <Field
              heading="I would describe myself as:"
              name="demeanors"
              options={Demeanor.enumValues.map((val) => { return { id: val.name, label: val.text } })}
              component={MultiCheckbox}
              otherTextValue={initialValues.otherDemeanor}
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
              name="careExperiences"
              options={CareExperience.enumValues.map((val) => { return { id: val.name, label: val.text } })}
              component={MultiCheckbox}
              otherTextValue={initialValues.otherCareExperience}
              onOtherValueChange={this.onOtherValueChange} />
          </div>
          <div className="mt4">
            <Field
              disabled={currentUser.kind !== "Admin"}
              heading="Trainings:"
              name="careTrainings"
              options={CareTraining.enumValues.map((val) => { return { id: val.name, label: val.text } })}
              component={MultiCheckbox}
              otherTextValue={initialValues.otherCareTraining}
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
          <Field name="otherNeighborhood" component="input" type="hidden" />          
          <Field name="otherAvailability" component="input" type="hidden" />
          <Field name="otherDemeanor" component="input" type="hidden" />
          <Field name="otherCareExperience" component="input" type="hidden" />
          <Field name="otherCareTraining" component="input" type="hidden" />  
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
  } else if (values.neighborhood === Neighborhood.OTHER.name && !values.otherNeighborhood) {
    errors.neighborhood = "Please provide 'Other' text"
  } else if (values.neighborhood === Neighborhood.OTHER.name && values.otherNeighborhood && values.otherNeighborhood.length < 2) {
    errors.neighborhood = "'Other' text be at least 2 characters"
  }

  if (!values.availabilities && !values.otherAvailability) {
    errors.availabilities = 'Required'
  } else if (values.availabilities.includes(Availability.OTHER.name) && !values.otherAvailability) {
    errors.availabilities = "Please provide 'Other' text"
  } else if (values.availabilities.includes(Availability.OTHER.name) && values.otherAvailability && values.otherAvailability.length < 2) {
    errors.availabilities = "'Other' text be at least 2 characters"
  }

  if (!values.demeanors && !values.otherDemeanor) {
    errors.demeanors = 'Required'
  } else if (values.demeanors.includes(Demeanor.OTHER.name) && !values.otherDemeanor) {
    errors.demeanors = "Please provide 'Other' text"
  } else if (values.demeanors.includes(Demeanor.OTHER.name) && values.otherDemeanor && values.otherDemeanor.length < 2) {
    errors.demeanors = "'Other' text be at least 2 characters"
  }

  if (!values.careExperiences && !values.otherCareExperience) {
    errors.careExperiences = 'Required'
  } else if (values.careExperiences.includes(CareExperience.OTHER.name) && !values.otherCareExperience) {
    errors.careExperiences = "Please provide 'Other' text"
  } else if (values.careExperiences.includes(CareExperience.OTHER.name) && values.otherCareExperience && values.otherCareExperience.length < 2) {
    errors.careExperiences = "'Other' text be at least 2 characters"
  }

  if (!values.careTrainings && !values.otherCareTraining) {
    errors.careTrainings = 'Required'
  } else if (values.careTrainings.includes(CareTraining.OTHER.name) && !values.otherCareTraining) {
    errors.careTrainings = "Please provide 'Other' text"
  } else if (values.careTrainings.includes(CareTraining.OTHER.name) && values.otherCareTraining && values.otherCareTraining.length < 2) {
    errors.careTrainings = "'Other' text be at least 2 characters"
  }

  return errors
}

GmaForm = reduxForm({
  form: 'gmaForm',   // a unique identifier for this form
  validate: validateOthers
})(GmaForm)

export default GmaForm;


