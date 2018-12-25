import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import LoginForm from './login_form';

const mapStateToProps = ({ errors }) => ({
  errors: errors.session,
});

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(login(user)),
});

const loginFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginForm);

export default loginFormContainer;
