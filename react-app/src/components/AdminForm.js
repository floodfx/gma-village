import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { normalizePhone } from './forms/Normalize';
import {
  required,
  minLength,
  maxLength,
  phone
} from './forms/Validate';
import FontAwesome from 'react-fontawesome';
import TextField from './forms/TextField';
import Checkbox from './forms/Checkbox';
import TosSummary from './TosSummary';
import ReactModal from 'react-modal';

class AdminForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showTos: !!props.showTos,
      acceptedTos: false
    }
  }

  componentWillReceiveProps(newProps) {
    // change value of profile_image_url when prop comes in
    const {change, profile_image_url} = this.props;
    if(profile_image_url !== newProps.profile_image_url) {
      change("profile_image_url", newProps.profile_image_url);
    }
  }

  handleOpenModal = () => {
    this.setState({ showTos: true });
  }

  onTosAccepted = () => {
    this.setState({ showTos: false });
    this.props.onTosAccepted();
  }

  onTosCanceled = () => {
    this.setState({ showTos: false });
    this.props.onTosCanceled();
  }

  onTosChecked = (acceptedTos) => {
    this.setState({acceptedTos});
  }

  render() {
    const {
      handleSubmit,
      handleFile,
      pristine,
      invalid,
      submitting,
      heading,
      profile_image_url,
    } = this.props
    return (
      <div>
        <ReactModal
          isOpen={this.state.showTos}
          contentLabel="Terms of Service Agreement"
          shouldCloseOnOverlayClick={false}>
          <TosSummary
            accepted={this.state.acceptedTos}
            onTosChecked={this.onTosChecked}
            onTosAccepted={this.onTosAccepted}
            onTosCanceled={this.onTosCanceled} />
        </ReactModal>
        <h2 className="lh-title fw2 f2">{heading}</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">

          <div className="mt4">
            <Field
              label="First Name"
              name="first_name"
              component={TextField}
              type="text"
              placeholder="First Name"
              validate={[required, minLength(2), maxLength(20)]} />
          </div>
          <div className="mt4">
            <Field
              label="Last Name"
              name="last_name"
              component={TextField}
              type="text"
              placeholder="Last Name"
              validate={[required, minLength(2), maxLength(30)]} />
          </div>
          <div className="mt4">
            <Field
              label="Phone Number"
              name="phone"
              component={TextField}
              type="text"
              placeholder="Phone Number"
              normalize={normalizePhone}
              validate={[required, phone]} />
          </div>
          <div className="mt4">
            <Field
              label="Active"
              name="active"
              component={Checkbox}
              type="checkbox" />
          </div>
          <div className="mt4">
            <label>Profile Photo:</label>
            {profile_image_url &&
              <div>
                <img
                  alt="your profile"
                  className="w-100 w-20-ns gma-orange-border"
                  src={profile_image_url}
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
              {this.props.profile_image_loading &&
                <FontAwesome name='spinner' spin={true} className="mr1"/>
              }
            </div>
          </div>
          <Field name="profile_image_url" component="input" type="hidden" value={profile_image_url} />
          <Field name="user_type" component="input" type="hidden" />
          <Field name="roles" component="input" type="hidden" />

          <div className="mt4">
            <button className="btn gma-orange-bg" type="submit" disabled={pristine || submitting || invalid}>
              {this.props.saving &&
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

AdminForm = reduxForm({
  form: 'adminForm'
})(AdminForm)

export default AdminForm;
