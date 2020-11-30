import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

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

    this.props.dispatch({
      type: 'REGISTER_STUDENT',
      payload: {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        username: this.state.username,
        email: this.state.email,
      },
    });

    this.props.history.push('/user');
  };

  handleBackClick = () => {
    this.props.history.push('/user');
  };

  render() {
    return (
      <form className="formPanel" onSubmit={this.handleSubmit}>
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
          <Button variant="contained" onClick={this.handleBackClick}>
            BACK
          </Button>
          <Button type="submit" variant="contained">
            SUBMIT
          </Button>
        </div>
      </form>
    );
  }
}

export default withRouter(connect()(AddStudentForm));
