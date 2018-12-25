import React from 'react';
import { Link } from 'react-router-dom';
import { func, bool } from 'prop-types';
// import './navbar.css';

class NavBar extends React.Component {
  constructor() {
    super();

    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  getLinks() {
    const { loggedIn } = this.props;

    if (loggedIn) {
      return (
        <>
          <Link to="/tweets">All Tweets</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/new_tweet">Write a Tweet</Link>

          <button type="button" onClick={this.logoutUser}>Logout</button>
        </>
      );
    }
    return (
        <>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
        </>
    );
  }

  logoutUser(e) {
    e.preventDefault();

    const { logout } = this.props;
    logout();
  }

  render() {
    return (
      <>
        <h1>Chirper</h1>
        {this.getLinks()}
      </>
    );
  }
}

NavBar.propTypes = {
  logout: func.isRequired,
  loggedIn: bool.isRequired,
};

export default NavBar;
