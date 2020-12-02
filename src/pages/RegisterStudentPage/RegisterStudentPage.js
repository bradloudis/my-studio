import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// CUSTOM COMPONENTS
import FinishRegistrationForm from '../../components/FinishRegistrationForm/FinishRegistrationForm';

//  MATERIAL UI
import { Container } from '@material-ui/core';

class RegisterStudentPage extends Component {
  componentDidMount() {
    console.log(this.props.match.params.tempKey);
    this.props.dispatch({
      type: 'GET_TEMP_STUDENT',
      payload: this.props.match.params.tempKey,
    });
  }
  render() {
    return (
      <Container>
        <h1>Finish Registration</h1>
        {this.props.store.errors.registrationMessage !== 'NOT AVAILABLE' ? (
          <FinishRegistrationForm tempKey={this.props.match.params.tempKey} />
        ) : (
          <p>Please contact system Admin.</p>
        )}
      </Container>
    );
  }
}

export default connect(mapStoreToProps)(RegisterStudentPage);
