import React, { Component } from 'react';

// MATERIAL UI
import { Button, TextField } from '@material-ui/core';

class AddStudentForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
  };

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    console.log(this.state);
    // if (this.state.username && this.state.password) {
    //   this.props.dispatch({
    //     type: 'LOGIN',
    //     payload: {
    //       username: this.state.username,
    //       password: this.state.password,
    //     },
    //   });
    // } else {
    //   this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    // }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Add a Student!</h2>
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
            label="username"
            value={this.state.username}
            onChange={this.handleInputChangeFor('username')}
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
          <Button type="submit" variant="contained">
            SUBMIT
          </Button>
        </div>
      </form>
    );
  }
}

export default AddStudentForm;
