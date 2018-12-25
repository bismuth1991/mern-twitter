import React from 'react';
import { withRouter } from 'react-router-dom';
import { bool, func, instanceOf } from 'prop-types';

class SignupForm extends React.Component {
  constructor() {
    super();

    this.state = {
      handle: '',
      email: '',
      password: '',
      password2: '',
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { history } = this.props;
    const { loggedIn, errors } = nextProps;

    if (loggedIn === true) {
      history.push('/tweets');
    }
    this.setState({ errors });
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { signup } = this.props;
    const {
      handle, email, password, password2,
    } = this.state;

    const user = {
      handle,
      email,
      password,
      password2,
    };

    signup(user);
  }

  renderErrors() {
    const { errors } = this.state;

    return (
      <ul>
        {Object.keys(errors).map(errorType => (
          <li>
            {errors[errorType]}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const {
      handle, email, password, password2,
    } = this.state;

    return (
      <div className="session-form-container">
        <form onSubmit={this.handleSubmit}>
          <div className="session-form">
            <input type="text" placeholder="Handle" value={handle} onChange={this.update('handle')} />
            <br />
            <input type="text" placeholder="Email" value={email} onChange={this.update('email')} />
            <br />
            <input type="text" placeholder="Password" value={password} onChange={this.update('password')} />
            <br />
            <input type="text" placeholder="Confirm Password" value={password2} onChange={this.update('password2')} />
            <br />
            <input type="submit" value="Submit" />

            {this.renderErrors()}
          </div>
        </form>
      </div>
    );
  }
}

SignupForm.propTypes = {
  loggedIn: bool.isRequired,
  signup: func.isRequired,
  errors: instanceOf(Object).isRequired,
  history: instanceOf(Object).isRequired,
};

export default withRouter(SignupForm);
