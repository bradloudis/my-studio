import React, { Component } from 'react';

class RegisterStudentPage extends Component {
  componentDidMount() {
    console.log(this.props.match.params.tempKey);
  }
  render() {
    return <h1>Finish Registration</h1>;
  }
}

export default RegisterStudentPage;
