import { combineReducers } from 'redux';
import authReducer from './authReducer';

export default combineReducers({
  // keys are also keys within state object
  // the auth piece of state is being produced by the authReducer
  auth: authReducer
});
