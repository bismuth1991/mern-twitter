import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import LoginForm from './login_form';

const mapStateToProps = ({ errors }) => ({
  errors: errors.session,
});

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(login(user)),
});

const LoginFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginForm);

export default LoginFormContainer;
