import React from 'react';
import { withRouter } from 'react-router-dom';
import { func, instanceOf } from 'prop-types';

class LoginForm extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { history } = this.props;
    const { errors } = nextProps;

    if (Object.assign(errors).length === 0) {
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

    const { login } = this.props;
    const { email, password } = this.state;

    const user = {
      email,
      password,
    };

    login(user);
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
    const { email, password } = this.state;

    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input type="text" value={email} placeholder="Email" onChange={this.update('email')} />
            <br />
            <input type="text" value={password} placeholder="Password" onChange={this.update('password')} />
            <br />
            <input type="submit" value="Submit" />
          </div>
        </form>
      </>
    );
  }
}

LoginForm.propTypes = {
  errors: instanceOf(Object).isRequired,
  login: func.isRequired,
};

export default withRouter(LoginForm);
