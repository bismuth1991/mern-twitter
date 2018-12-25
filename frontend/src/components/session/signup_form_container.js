import { connect } from 'react-redux';
import { signup } from '../../actions/session_actions';
import SignupForm from './signup_form';

const mapStateToProps = ({ session, errors }) => ({
  signedIn: session.isAuthenticated,
  errors: errors.session,
});

const mapDispatchToProps = dispatch => ({
  signup: user => dispatch(signup(user)),
});

const SignupFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignupForm);

export default SignupFormContainer;
