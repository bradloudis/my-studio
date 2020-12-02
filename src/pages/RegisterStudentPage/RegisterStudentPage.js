import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// CUSTOM COMPONENTS
import FinishRegistrationForm from '../../components/FinishRegistrationForm/FinishRegistrationForm';

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
      <div>
        <h1>Finish Registration</h1>
        <FinishRegistrationForm tempKey={this.props.match.params.tempKey} />
      </div>
    );
  }
}

export default connect(mapStoreToProps)(RegisterStudentPage);
