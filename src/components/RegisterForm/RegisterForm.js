import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// MATERIAL UI
import { TextField, Button, Box } from '@material-ui/core';

class RegisterForm extends Component {
  state = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  registerUser = (event) => {
    event.preventDefault();

    this.props.dispatch({
      type: 'REGISTER_TEACHER',
      payload: {
        username: this.state.username,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        phone: this.state.phone,
      },
    });
  }; // end registerUser

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <form className="formPanel" onSubmit={this.registerUser}>
        <h2>Teacher Registration</h2>
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
          <Box mt={2}>
            <Button type="submit" variant="contained">
              SUBMIT
            </Button>
          </Box>
        </div>
      </form>
    );
  }
}

export default connect(mapStoreToProps)(RegisterForm);
