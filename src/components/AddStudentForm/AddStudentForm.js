import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// SWEET ALERT
import Swal from 'sweetalert2';
// MATERIAL UI
import { Button, TextField, Box, Card, CardContent } from '@material-ui/core';

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
        email: this.state.email,
      },
    });

    Swal.fire({
      title: 'Success!',
      text: `${this.state.firstName} has been successfully added to your studio!`,
      icon: 'success',
      confirmButtonText: `Ok`,
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.props.history.push('/user');
      }
    });
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
            label="email"
            value={this.state.email}
            onChange={this.handleInputChangeFor('email')}
            required
          />
        </div>
        <Box mt={2}>
          <Box component="span" mr={1}>
            <Button variant="contained" onClick={this.handleBackClick}>
              BACK
            </Button>
          </Box>
          <Button type="submit" variant="contained">
            SUBMIT
          </Button>
        </Box>
      </form>
    );
  }
}

export default withRouter(connect()(AddStudentForm));
