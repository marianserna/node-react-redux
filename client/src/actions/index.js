import axios from 'axios';

import { FETCH_USER } from './types';

// actionCreator purpose: returns an action (js object with type property and optionally a payload as well)
// redux thunk allows to break the rule of returning an action right away. In this case, the action creator doesn't return an action but it passes it on to the dispatch function (function that belongs to the redux store)
// dispatch function called with an action: action is forwarded to all reducers in the app
// only thing redux-thunk does is giving us access to the dispatch function

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);

  // reuse type bc we'll get the same data
  dispatch({ type: FETCH_USER, payload: res.data });
};
