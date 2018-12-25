import jwtDecode from 'jwt-decode';
import * as APIUtil from '../util/session_api_util';

export const RECEIVE_USER_LOGOUT = 'RECEIVE_USER_LOGOUT';
export const RECEIVE_USER_LOGIN = 'RECEIVE_USER_LOGIN';
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';

export const loginUser = () => ({
  type: RECEIVE_USER_LOGIN,
});

export const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT,
});

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser,
});

export const receiveSessionErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors,
});

export const signup = user => dispatch => (
  APIUtil.signup(user)
    .then(
      () => dispatch(loginUser()),
      err => dispatch(receiveSessionErrors(err.response.data)),
    )
);

export const login = user => dispatch => (
  APIUtil.login(user)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      APIUtil.setAuthToken(token);
      const decoded = jwtDecode(token);
      dispatch(receiveCurrentUser(decoded));
    })
    .catch(err => dispatch(receiveSessionErrors(err.response.data)))
);


export const logout = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  APIUtil.setAuthToken(false);
  dispatch(logoutUser());
};
