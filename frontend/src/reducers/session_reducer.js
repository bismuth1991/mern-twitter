import { RECEIVE_USER_LOGOUT } from '../actions/session_actions';

const initialState = {
  isAuthenticate: false,
  user: undefined,
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_USER_LOGOUT:
      return {
        isAuthenticate: false,
        user: undefined,
      };
    default:
      return state;
  }
};

export default sessionReducer;
