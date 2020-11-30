import React, { Component } from 'react';

class FinishRegistrationForm extends Component {
  render() {
    state = {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      instrument: '',
    };

    registerUser = (event) => {
      event.preventDefault();

      this.props.dispatch({
        type: 'FINISH_STUDENT_REG',
        payload: {
          username: this.state.username,
          password: this.state.password,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          phone: this.state.phone,
          instrument: this.state.instrument,
        },
      });
    };

    handleInputChangeFor = (propertyName) => (event) => {
      this.setState({
        [propertyName]: event.target.value,
      });
    };

    return (
      <form className="formPanel" onSubmit={this.registerUser}>
        <h2>Student Registration</h2>
        {this.props.store.errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {this.props.store.errors.registrationMessage}
          </h3>
        )}
        <div>
          <TextField
            label="first name"
            value={this.state.firstName}
            onChange={this.handleInputChangeFor('firstName')}
            required
          />
        </div>
        <div>
          <TextField
            label="last name"
            value={this.state.lastName}
            onChange={this.handleInputChangeFor('lastName')}
            required
          />
        </div>
        <div>
          <TextField
            label="phone number"
            value={this.state.phone}
            onChange={this.handleInputChangeFor('phone')}
            required
          />
        </div>
        <div>
          <TextField
            label="email"
            value={this.state.email}
            onChange={this.handleInputChangeFor('email')}
            required
          />
        </div>
        <div>
          <TextField
            label="instrument"
            value={this.state.instrument}
            onChange={this.handleInputChangeFor('instrument')}
            required
          />
        </div>
        <div>
          <TextField
            label="username"
            value={this.state.username}
            onChange={this.handleInputChangeFor('username')}
            required
          />
        </div>
        <div>
          <TextField
            label="password"
            type="password"
            value={this.state.password}
            onChange={this.handleInputChangeFor('password')}
            required
          />
        </div>
        <div>
          <Button type="submit" variant="contained">
            SUBMIT
          </Button>
        </div>
      </form>
    );
  }
}

export default FinishRegistrationForm;
