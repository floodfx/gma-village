import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { Role } from 'gma-village-data-model';
import FontAwesome from 'react-fontawesome';

const Checkbox = ({input:{name, value}}) => {
  console.log(name, value)
  return (
    <input className="mr2" type="checkbox" defaultChecked={true} name={name} value={value}/>
  )
}

let AdminProfileForm = (props) => {
  const { handleSubmit, pristine, reset, submitting, saving } = props
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb4">
        <label>First Name</label>
        <div>
          <Field name="first_name" component="input" type="text" placeholder="First Name"/>
        </div>
      </div>
      <div className="mb4">
        <label>Last Name</label>
        <div>
          <Field name="last_name" component="input" type="text" placeholder="Last Name"/>
        </div>
      </div>
      <div className="mb4">
        <label>Phone</label>
        <div>
          <Field name="phone" component="input" type="phone" placeholder="Phone Number"/>
        </div>
      </div>
      <div className="mb4">
        <label>Active</label>
        <div>
          <label><Field name="active" component="input" type="checkbox"/>Active</label>
        </div>
      </div>
      <div className="mb4">
        <label>Roles</label>
        <div>
          <label><Field name="roles[0]" component="input" type="checkbox" normalize={(value) => value ? "ADMIN" : null}/>Admin</label>
        </div>
      </div>
      <div>
        <button className="btn gma-orange-bg" type="submit" disabled={pristine || submitting}>
          {saving &&
            <FontAwesome name='spinner' spin={true} className="mr1"/>
          }
          Save
        </button>
      </div>
    </form>
  )
}

AdminProfileForm = reduxForm({
  form: 'adminProfileForm'  // a unique identifier for this form
})(AdminProfileForm)

const mapStateToProps = (state) => {
  const { auth } = state
  return {
    initialValues: auth.user,
  }
}

export default connect(mapStateToProps)(AdminProfileForm)
