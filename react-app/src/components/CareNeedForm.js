import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  Neighborhood
} from 'gma-village-data-model';
import {
  required,
  requiredArray
} from './forms/Validate';
import FontAwesome from 'react-fontawesome';
import MultiCheckbox from './forms/MultiCheckbox';
import KidsCheckbox from './forms/KidsCheckbox';
import MultiRadio from './forms/MultiRadio';
import DateTimeStartEnd from './forms/DateTimeStartEnd';
import ElsewhereLearnMore from './ElsewhereLearnMore';

const otherFieldMap = {
  neighborhood: "other_neighborhood"
}

const DATE_FORMAT_RFC3339 = 'YYYY-MM-DDTHH:mm:ssZ'

class CareNeedForm extends Component {
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
      children,
      other_neighborhood
    }
  }

  careStartTimeValueChange = (value) => {
    var rfc3339Start = value.format(DATE_FORMAT_RFC3339);
    this.props.change("start_time", rfc3339Start);
  }

  careEndTimeValueChange = (value) => {
    var rfc3339End = value.format(DATE_FORMAT_RFC3339);
    this.props.change("end_time", rfc3339End);
  }

  onOtherValueChange = (name, value) => {
    const otherField = otherFieldMap[name];
    this.props.change(otherField, value);
  }

  render() {
    const {
      handleSubmit,
      pristine,
      invalid,
      submitting,
      heading,
      description
    } = this.props
    const { children, other_neighborhood } = this.state;

    return (
      <div>
        <h2 className="lh-title fw2 f1">{heading}</h2>
        {description &&
          <p className="lh-copy fw3 f3">{description}</p>
        }
        <h3 className="lh-title fw2 f2">Delivery Schedule</h3>
        <p className="lh-copy fw3 f3">
          Text messages are sent between 9am-7pm PT.
          Messages outside that window are delivered in the next window.
        </p>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mt4">
            <Field
              heading="I need child care for:"
              name="children"
              component={KidsCheckbox}
              options={children.slice(0)}
              validate={[requiredArray]} />
          </div>
          <div className="mt4">
            <Field
              heading="My most immediate need for child care is:"
              name="careDateStartEnd"
              component={DateTimeStartEnd}
              placeholder="Date of Care"
              onStartDateTimeValueChange={this.careStartTimeValueChange}
              onEndDateTimeValueChange={this.careEndTimeValueChange}
              />
          </div>
          <div className="mt4">
            <Field
              heading="In the following neighborhood:"
              name="neighborhood"
              options={Neighborhood.enumValues.map((val) => { return { id: val.name, label: val.text } })}
              component={MultiRadio}
              otherTextValue={other_neighborhood}
              onOtherValueChange={this.onOtherValueChange}
              />
          </div>
          <div className="mt4">
            <Field
              heading="I would like the care provided at:"
              name="care_locations"
              options={[
                {id: "PROVIDERS_HOME", label: "Provider's Home"},
                {id: "ELSEWHERE", label: "Elsewhere"},
              ]}
              component={MultiCheckbox}
              validate={[required]}/>
              <ElsewhereLearnMore />
          </div>

          <Field name="other_neighborhood" component="input" type="hidden" />
          <div className="mt4">
            <button className="btn gma-orange-bg" type="submit" disabled={pristine || submitting || invalid}>
              {this.props.saving &&
                <FontAwesome name='spinner' spin={true} className="mr1"/>
              }
              Send
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

  if (!values.start_time || !values.end_time) {
    errors.careDateStartEnd = 'Start and End Time Required'
  } else if (values.start_time && values.end_time &&
             values.start_time >= values.end_time) {
    errors.careDateStartEnd = 'Start Time must be before End Time'
  }

  return errors
}

CareNeedForm = reduxForm({
  form: 'careRequestForm',   // a unique identifier for this form
  validate: validateOthers
})(CareNeedForm)

export default CareNeedForm;
