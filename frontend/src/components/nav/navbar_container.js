import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';

import NavBar from './navbar';

const mapStateToProps = ({ session: { isAuthenticated } }) => ({
  loggedIn: isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
});

const NavBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavBar);

export default NavBarContainer;
