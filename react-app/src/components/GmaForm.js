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
import TosSummary from './TosSummary';
import ReactModal from 'react-modal';

const otherFieldMap = {
  neighborhood: "other_neighborhood",
  availabilities: "other_availability",
  demeanors: "other_demeanor",
  care_experiences: "other_care_experience",
  care_trainings: "other_care_training"
}

class GmaForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showTos: !!props.showTos,
      acceptedTos: false
    }
  }

  componentWillReceiveProps(newProps) {
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
      profile_image_url
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
              options={
                Neighborhood.enumValues.slice(0)
                .sort(customSortNeighborhoods).map((val) => {
                  if(val.name === 'OTHER') {
                    return {id: 'OTHER_OAKLAND', label:val.text}
                  } else {
                    return { id: val.name, label: val.text }
                  }
                })
              }
              component={MultiRadio}
              otherTextValue={initialValues.other_neighborhood}
              onOtherValueChange={this.onOtherValueChange}
              />
          </div>
          <div className="mt4">
            <Field
              label="I can care for kids outside my area:"
              name="available_outside_neighborhood"
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
              options={[
                {id: "PROVIDERS_HOME", label: "My Home"},
                {id: "ELSEWHERE", label: "Elsewhere"},
              ]}
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
              name="why_care_for_kids"
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
            <div className="mt4">
              <Field
                disabled={currentUser.user_type !== "ADMIN"}
                label="Training:"
                name="care_trainings"
                component={TextArea}
                format={(val) => !!val ? val.join('\n') : ""}
                normalize={(val) => val.split('\n')}
                validate={[required]} />
            </div>
          </div>
          <div className="mt4">
            <Field
              label="Something else I would like to share:"
              name="additional_info"
              component={TextArea}
              validate={[required]} />
          </div>
          <div className="mt4">
            <label>Profile Photo:</label>
            {profile_image_url &&
              <div>
                <img
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
          <Field name="profile_image_url" component="input" type="hidden" value={this.props.profile_image_url} />
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

  return errors
}

GmaForm = reduxForm({
  form: 'gmaForm',   // a unique identifier for this form
  validate: validateOthers
})(GmaForm)

export default GmaForm;
