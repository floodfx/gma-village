import React, { Component } from 'react';
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { Role } from 'gma-village-data-model'
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

class AdminForm extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(newProps) {
    // change value of profilePhotoUrl when prop comes in
    const {change, profilePhotoUrl} = this.props;
    if(profilePhotoUrl !== newProps.profilePhotoUrl) {
      change("profilePhotoUrl", newProps.profilePhotoUrl);
    }
  }

  render() {
    const { handleSubmit, handleFile, pristine, invalid, reset, submitting } = this.props
    return (
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
            label="Active:"
            name="active"
            defaultValue={true}
            component={Checkbox}
            type="checkbox" />
        </div>
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
    )
  }
}


AdminForm = reduxForm({
  form: 'adminForm',   // a unique identifier for this form
  initialValues: {
    active: false,
    roles: [Role.ADMIN.name]
  }
})(AdminForm)


export default AdminForm