import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { Neighborhood, Role } from 'gma-village-data-model'

let GmaProfileForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name</label>
        <div>
          <Field name="first_name" component="input" type="text" placeholder="First Name"/>
        </div>
      </div>
      <div>
        <label>Last Name</label>
        <div>
          <Field name="last_name" component="input" type="text" placeholder="Last Name"/>
        </div>
      </div>
      <div>
        <label>Phone</label>
        <div>
          <Field name="phone" component="input" type="phone" placeholder="Phone Number"/>
        </div>
      </div>
      <div>
        <label>The area I live is called:</label>
        <div>
          {Neighborhood.enumValues.map((val) => {
            return <label><Field name="neighborhood" component="input" type="radio" normalize={(value) => value ? val.name : null}/>{val.name}</label>
          })}
        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
      </div>
    </form>
  )
}

GmaProfileForm = reduxForm({
  form: 'gmaProfileForm'  // a unique identifier for this form
})(GmaProfileForm)

const mapStateToProps = (state) => {
  const { auth } = state
  return {
    initialValues: auth.user
  }
}

export default connect(mapStateToProps)(GmaProfileForm)
