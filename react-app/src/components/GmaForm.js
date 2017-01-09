import React, { Component } from 'react';
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import {
  Availability,
  CareAge,
  CareExperience,
  CareLocation,
  CareTraining,
  City,
  Demeanor,
  Neighborhood
} from 'gma-village-data-model'
import { normalizePhone } from './forms/Normalize'
import {
  required,
  requiredArray,
  minLength,
  maxLength,
  minValue,
  number,
  phone,
  yesOrNo
} from './forms/Validate'

import FontAwesome from 'react-fontawesome'
import MultiCheckbox from './forms/MultiCheckbox'
import MultiRadio from './forms/MultiRadio'
import TextField from './forms/TextField'
import TextArea from './forms/TextArea'
import Checkbox from './forms/Checkbox'

const otherFieldMap = {
  neighborhood: "otherNeighborhood",
  availabilities: "otherAvailability",
  demeanors: "otherDemeanor",
  careExperiences: "otherCareExperience",
  careTrainings: "otherCareTraining"
}

class GmaForm extends Component {
  constructor(props) {
    super(props);
    console.log("GmaForm props", props);
  }

  componentWillReceiveProps(newProps) {
    const {change, profilePhotoUrl} = this.props;
    if(profilePhotoUrl !== newProps.profilePhotoUrl) {
      change("profilePhotoUrl", newProps.profilePhotoUrl);
    }
  }

  onOtherValueChange = (name, value) => {
    console.log("onOtherValueChange", name, value)
    const otherField = otherFieldMap[name];
    console.log("changingOtherValue", name, otherField, value)
    this.props.change(otherField, value);
  }

  render() {
    const { 
      handleSubmit, 
      handleFile, 
      pristine, 
      invalid, 
      reset, 
      submitting,
      heading,
      initialValues
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
              heading="The area I live is called:"
              name="neighborhood"
              options={Neighborhood.enumValues.map((val) => { return { id: val.name, label: val.text } })}
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
              defaultValue={false}
              type="checkbox" />
          </div>
          <div className="mt4">
            <Field
              label="Active:"
              name="active"
              defaultValue={true}
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
              options={CareLocation.enumValues.map((val) => { return { id: val.name, label: val.text } })}
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
          <Field name="otherNeighborhood" component="input" type="hidden" />          
          <Field name="otherAvailability" component="input" type="hidden" />
          <Field name="otherDemeanor" component="input" type="hidden" />
          <Field name="otherCareExperience" component="input" type="hidden" />
          <Field name="otherCareTraining" component="input" type="hidden" />  
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

const mapStateToProps = (state) => {
  const { gmaProfile } = state;
  var initialValues = gmaProfile.gma || {
    city: City.OAKLAND.name,
    active: false,
    isAvailableOutsideNeighborhood: false
  }
  console.log("initVals", initialValues)
  return {
    initialValues
  }
}

export default connect(mapStateToProps)(GmaForm)


