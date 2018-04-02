import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';

export default combineReducers({
  // keys are also keys within state object
  // the auth piece of state is being produced by the authReducer
  auth: authReducer,
  form: reduxForm
});
