import { FETCH_USER } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      // return user model or false if user is not logged in
      return action.payload || false;

    default:
      return state;
  }
}
