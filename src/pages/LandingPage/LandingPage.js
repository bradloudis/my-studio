import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// SWEET ALERT
import Swal from 'sweetalert2';
// MATERIAL UI
import { Button } from '@material-ui/core';

import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../../components/RegisterForm/RegisterForm';

class LandingPage extends Component {
  state = {
    heading: 'Class Component',
  };

  onLogin = (event) => {
    this.props.history.push('/login');
  };

  onRegister = () => {
    Swal.fire({
      title: 'Are you a teacher?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonTex: 'No',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('you are a teacher');
      } else if (result.isDenied) {
        console.log('you are a student');
        Swal.fire(
          'Please wait for an email from your teacher inviting you to register your account!'
        );
      }
    });
    // this.props.history.push('/registration');
  };

  render() {
    return (
      <div className="container">
        <div className="grid">
          <div className="grid-col grid-col_8" className="formPanel">
            <p>
              When teaching students it’s hard to stay organized and motivate
              your students to keep up with consistent, daily practice. My
              studio is an application with great organizational tools to help a
              teacher keep track of their students and fun features that
              encourage their students to keep working hard.
            </p>

            <p>
              My Studio hopes to help simplify studio management for teachers
              and sparks joy in the practice process for students.
            </p>
          </div>
          <div className="grid-col grid-col_4" className="formPanel">
            {/* <RegisterForm /> */}
            <center>
              <h4>Need an account?</h4>
              <Button variant="contained" onClick={this.onRegister}>
                REGISTER
              </Button>
            </center>

            <center>
              <h4>Already a Member?</h4>
              <Button variant="contained" onClick={this.onLogin}>
                LOGIN
              </Button>
            </center>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LandingPage);
