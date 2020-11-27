import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class StudentDetailsPage extends Component {
  componentDidMount() {
    // this is the id to send in dispatch to get the details for the individual student!
    console.log(this.props.match.params.id);
    this.props.dispatch({
      type: 'GET_STUDENT_DETAILS',
      payload: this.props.match.params.id,
    });
  }

  render() {
    return (
      <div>
        <h1>STUDENT DETAILS PAGE!</h1>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(StudentDetailsPage);
