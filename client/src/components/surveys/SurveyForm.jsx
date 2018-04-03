// import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';
// this reduxform function allows the component to communicate with the store (think of it as 'connect' --> it's similar, not the same)
import { reduxForm, Field } from 'redux-form';

import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends React.Component {
  renderFields = () => {
    return formFields.map(({ label, name }) => {
      return (
        <Field
          key={label}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  };

  render() {
    return (
      <div>
        {/* handleSubmit is provided by reduxForm */}
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            CANCEL
          </Link>
          <button className="teal btn-flat right white-text" type="submit">
            NEXT
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

// values -> obj containing values that come out of the form
const validate = values => {
  const errors = {};

  // email validation handled separately (utils > validateEmails)
  errors.recipients = validateEmails(values.recipients || '');

  // errors are automatically passed on to the fields that control that property
  // forEach bc we're not trying to return a list of anything
  formFields.forEach(({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide a ${name}`;
    }
  });

  return errors;
};

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);
