import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// MATERIAL UI
import { TextField, Button } from '@material-ui/core';

class FinishRegistrationForm extends Component {
  state = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    instrument: '',
    tempKey: this.props.tempKey,
  };

  registerUser = (event) => {
    event.preventDefault();

    this.props.dispatch({
      type: 'FINISH_STUDENT_REG',
      payload: this.state,
    });
  };

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <form className="formPanel" onSubmit={this.registerUser}>
        <h2>
          Welcome {this.props.store.tempStudent.first_name}{' '}
          {this.props.store.tempStudent.last_name}!
        </h2>
        <p>Please finish registering with My Studio</p>
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

export default connect(mapStoreToProps)(FinishRegistrationForm);
