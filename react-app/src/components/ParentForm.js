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
import TosSummary from './TosSummary';
import ReactModal from 'react-modal';

const otherFieldMap = {
  neighborhood: "other_neighborhood"
}

class ParentForm extends Component {
  constructor(props) {
    super(props);
    const { initialValues } = props;
    var children = [];
    var other_neighborhood = '';
    if(initialValues) {
      children = initialValues.children || [];
      other_neighborhood = initialValues.other_neighborhood || '';
    }
    this.state = {
      showAdvanced: false,
      children,
      other_neighborhood,
      childFirstName: '',
      childBirthDay: "0",
      childBirthMonth: "0",
      childBirthYear: "0",
      validChild: false,
      showTos: !!props.showTos,
      acceptedTos: false
    }
  }

  resetChildInput = () => {
    this.setState({
      childFirstName: '',
      childBirthDay: "0",
      childBirthMonth: "0",
      childBirthYear: "0",
      validChild: false
    })
  }

  componentWillReceiveProps(newProps) {
    console.log("componentWillReceiveProps", newProps)
    const {change, profile_image_url} = this.props;
    if(profile_image_url !== newProps.profile_image_url) {
      change("profile_image_url", newProps.profile_image_url);
    }
  }

  removeChild = (index) => {
    this.setState((prevState, props) => ({
      children: [...prevState.children.slice(0, index), ...prevState.children.slice(index+1)]
    }));
  }

  addChild = () => {
    const year = parseInt(this.state.childBirthYear, 10);
    const month = parseInt(this.state.childBirthMonth-1, 10);
    const day = parseInt(this.state.childBirthDay, 10);
    const newChild = {
      first_name: this.state.childFirstName,
      dob: {year, month, day}
    }
    this.setState((prevState, props) => {
      const newChildren = prevState.children.concat([newChild]);
      this.props.change("children", newChildren);
      return {
        children: newChildren
      }
    });
    this.resetChildInput()
  }

  childValueChange = (childPart, value) => {
    switch(childPart) {
      case "childFirstName":
      this.setState({childFirstName: value});
      break;
      case "childBirthDay":
      this.setState({childBirthDay: value});
      break;
      case "childBirthMonth":
      this.setState({childBirthMonth: value});
      break;
      case "childBirthYear":
      this.setState({childBirthYear: value});
      break;
    }
    this.checkValidChild();
  }

  checkValidChild = () => {
    this.setState((prevState, props) => {
      const validChild = (prevState.childFirstName.length > 1 &&
                        prevState.childBirthDay !== "0" &&
                        prevState.childBirthMonth !== "0" &&
                        prevState.childBirthYear !== "0")
      return {
        validChild
      }
    });
  }

  onOtherValueChange = (name, value) => {
    const otherField = otherFieldMap[name];
    this.props.change(otherField, value);
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
      profile_image_url
    } = this.props
    const { children, other_neighborhood } = this.state;
    const days = [...Array(31)].map((v, i) => i + 1);
    const months = [...Array(12)].map((v, i) => i + 1);
    const years = [...Array(13)].map((v, i) => i + 1);
    const year = moment().year()
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
          {!this.state.showAdvanced &&
            <div className="mv4 gma-orange pointer underline f3" onClick={() => this.setState({showAdvanced:true})}>
              <FontAwesome name='caret-right' className="mr1"/>Show Advanced
            </div>
          }
          {this.state.showAdvanced &&

            <div>
              <div className="mv4 gma-orange pointer underline f3" onClick={() => this.setState({showAdvanced:false})}>
                <FontAwesome name='caret-down' className="mr1"/>Hide Advanced
              </div>
              <div className="mt4">
                <Field
                  label="My Children:"
                  name="children"
                  component={Hidden}
                  validate={[requiredArray]} />
                {children.length > 0 &&
                  <ul>
                    {children.map((child, index) => {
                      return (
                        <li key={index} className="ph3 pv2">
                          {child.first_name} (born: {moment([child.dob.year, child.dob.month, child.dob.day]).format("MM-DD-YYYY")})
                          <button type="button" className="btn btn-sm gma-orange-bg ml2" onClick={() => this.removeChild(index)}>
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
                      <input type="text" value={this.state.childFirstName} name="child_first_name" onChange={(e) => this.childValueChange("childFirstName", e.target.value)} />
                    </div>
                  </div>
                  <div className="dt">
                    <div className="dtc">
                      <label className="normal mh2">Child Birth Date:</label>
                    </div>
                    <div className="dtc">
                      <select value={this.state.childBirthMonth} onChange={(e) => this.childValueChange("childBirthMonth", e.target.value)}>
                        <option value={0}>Month</option>
                        {months.map((month, index) => {
                          return <option key={index} value={month}>{leftPad(month, 2, 0)}</option>
                        })}
                      </select>
                      <select value={this.state.childBirthDay} onChange={(e) => this.childValueChange("childBirthDay", e.target.value)}>
                        <option value={0}>Day</option>
                        {days.map((day, index) => {
                          return <option key={index} value={day}>{leftPad(day, 2, 0)}</option>
                        })}
                      </select>
                      <select value={this.state.childBirthYear} onChange={(e) => this.childValueChange("childBirthYear", e.target.value)}>
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
                    disabled={!this.state.validChild}
                    onClick={() => this.addChild()}>
                    Add Child
                  </button>
                </div>
              </div>
              <div className="mt4">
                <Field
                  heading="I live in:"
                  name="neighborhood"
                  options={Neighborhood.enumValues.slice(0).sort(customSortNeighborhoods).map((val) => { return { id: val.name, label: val.text } })}
                  format={(val) => {
                    if(val === 'OTHER_OAKLAND') {
                      val = 'OTHER';
                    }
                    return val
                  }}
                  normalize={(val) => {
                    if(val === 'OTHER') {
                      val = 'OTHER_OAKLAND'
                    }
                    return val
                  }}
                  component={MultiRadio}
                  otherTextValue={other_neighborhood}
                  onOtherValueChange={this.onOtherValueChange}
                  />
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
                  component={Checkbox}
                  type="checkbox" />
              </div>
              <Field name="other_neighborhood" component="input" type="hidden" />
              <Field name="showAdvanced" component="input" type="hidden" value={this.state.showAdvanced}/>
              <Field name="profile_image_url" component="input" type="hidden" value={profile_image_url} />
            </div>
          }
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

const validateOthers = values => {
  const errors = {}
  if(!values.showAdvanced) {
    return
  }

  if (!values.neighborhood && !values[otherFieldMap]) {
    errors.neighborhood = 'Required'
  } else if (values.neighborhood === Neighborhood.OTHER.name && !values.other_neighborhood) {
    errors.neighborhood = "Please provide 'Other' text"
  } else if (values.neighborhood === Neighborhood.OTHER.name && values.other_neighborhood && values.other_neighborhood.length < 2) {
    errors.neighborhood = "'Other' text be at least 2 characters"
  }

  return errors
}

ParentForm = reduxForm({
  form: 'parentForm',   // a unique identifier for this form
  validate: validateOthers
})(ParentForm)

export default ParentForm;
