import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import {
  Availability,
  CareAge,
  CareExperience,
  CareLocation,
  CareTraining,
  Demeanor,
  Neighborhood
} from 'gma-village-data-model'

let GmaForm = (props) => {
  const { handleSubmit, handleFile, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit} enctype="multipart/form-data">
      <div>
        <label className="fw7 f3">Hi! My name is:</label>
        <div>
          <Field name="first_name" component="input" type="text" placeholder="First Name"/>
        </div>
      </div>
      <div className="mt4">
        <label>My phone # is:</label>
        <div>
          <Field name="phone" component="input" type="phone" placeholder="Phone Number"/>
        </div>
      </div>
      <div className="mt4">
        <label>The area I live is called:</label>
        <div>
          <ul className="list pl0 ml0 tl mw8">
          {Neighborhood.enumValues.map((val, index) => {
            return <li className="ph3 pv1"><label><Field name="neighborhood" component="input" type="radio" value={val.name} normalize={(value) => value ? val.name : null}/>&nbsp;{val.text}</label></li>
          })}
            <li className="ph3 pv1"><label><Field name="neighborhood" component="input" type="radio" value="Other"/>&nbsp;Other:&nbsp;</label><Field name="otherNeighborhood" component="input" type="text"/></li>
          </ul>
        </div>
      </div>
      <div className="mt4">
        <label>I can care for kids outside my area:</label>
        <div>
          <ul className="list pl0 ml0 tl mw8">
            <li className="ph3 pv1"><label><Field name="isAvailableOutsideNeighborhood" component="input" type="radio" value="yes"/>&nbsp;yes</label></li>
            <li className="ph3 pv1"><label><Field name="isAvailableOutsideNeighborhood" component="input" type="radio" value="no"/>&nbsp;no</label></li>
          </ul>
        </div>
      </div>
      <div className="mt4">
        <label>I am comfortable caring for kids ages:</label>
        <div>
          <ul className="list pl0 ml0 tl mw8">
          {CareAge.enumValues.map((val, index) => {
            return <li className="ph3 pv1"><label><Field name={`careAges[${index}]`} component="input" type="checkbox" value={val.name} normalize={(value) => value ? val.name : null}/>&nbsp;{val.text}</label></li>
          })}
          </ul>
        </div>
      </div>
      <div className="mt4">
        <label>I am generally available:</label>
        <div>
          <ul className="list pl0 ml0 tl mw8">
          {Availability.enumValues.map((val, index) => {
            return <li className="ph3 pv1"><label><Field name={`availabilities[${index}]`} component="input" type="checkbox" value={val.name} normalize={(value) => value ? val.name : null}/>&nbsp;{val.text}</label></li>
          })}
            <li className="ph3 pv1"><label><Field name="otherAvailabilityCheckbox" component="input" type="checkbox"/>&nbsp;Other:&nbsp;</label><Field name="otherAvailability" component="input" type="text"/></li>
          </ul>
        </div>
      </div>
      <div className="mt4">
        <label>I can provide child care at:</label>
        <div>
          <ul className="list pl0 ml0 tl mw8">
          {CareLocation.enumValues.map((val, index) => {
            return <li className="ph3 pv1"><label><Field name={`careLocations[${index}]`} component="input" type="checkbox" value={val.name} normalize={(value) => value ? val.name : null}/>&nbsp;{val.text}</label></li>
          })}
          </ul>
        </div>
      </div>
      <div className="mt4">
        <label>I would describe myself as:</label>
        <div>
          <ul className="list pl0 ml0 tl mw8">
          {Demeanor.enumValues.map((val, index) => {
            return <li className="ph3 pv1"><label><Field name={`demeanors[${index}]`} component="input" type="checkbox" value={val.name} normalize={(value) => value ? val.name : null}/>&nbsp;{val.text}</label></li>
          })}
            <li className="ph3 pv1"><label><Field name="otherDemeanorCheckbox" component="input" type="checkbox"/>&nbsp;Other:&nbsp;</label><Field name="otherDemeanor" component="input" type="text"/></li>
          </ul>
        </div>
      </div>
      <div className="mt4">
        <label>I enjoy caring for kids because:</label>
        <div>
          <Field className="w-40-ns w-100 h5" name="whyCareForKidsText" component="textarea"/>
        </div>
      </div>
      <div className="mt4">
        <label>Experience:</label>
        <div>
          <ul className="list pl0 ml0 tl mw8">
          {CareExperience.enumValues.map((val, index) => {
            return <li className="ph3 pv1"><label><Field name={`careExperiences[${index}]`} component="input" type="checkbox" value={val.name} normalize={(value) => value ? val.name : null}/>&nbsp;{val.text}</label></li>
          })}
            <li className="ph3 pv1"><label><Field name="otherCareExperienceCheckbox" component="input" type="checkbox"/>&nbsp;Other:&nbsp;</label><Field name="otherCareExperience" component="input" type="text"/></li>
          </ul>
        </div>
      </div>
      <div className="mt4">
        <label>Trainings:</label>
        <div>
          <ul className="list pl0 ml0 tl mw8">
          {CareTraining.enumValues.map((val, index) => {
            return <li className="ph3 pv1"><label><Field name={`careTrainings[${index}]`} component="input" type="checkbox" value={val.name} normalize={(value) => value ? val.name : null}/>&nbsp;{val.text}</label></li>
          })}
            <li className="ph3 pv1"><label><Field name="otherCareTrainingCheckbox" component="input" type="checkbox"/>&nbsp;Other:&nbsp;</label><Field name="otherCareTraining" component="input" type="text"/></li>
          </ul>
        </div>
      </div>
      <div className="mt4">
        <label>Something else I would like to share:</label>
        <div>
          <Field className="w-40-ns w-100 h5" name="additionalInformationText" component="textarea"/>
        </div>
      </div>
      <div className="mt4">
        <label>Profile Photo:</label>
        <div>
          <Field name="profilePhoto" component="input" type="file" onChange={(e) => handleFile(e)}/>
        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
      </div>
    </form>
  )
}

GmaForm = reduxForm({
  form: 'gmaForm'  // a unique identifier for this form
})(GmaForm)

const mapStateToProps = (state) => {
  const { gma } = state
  return {}
}

export default connect(mapStateToProps)(GmaForm)
