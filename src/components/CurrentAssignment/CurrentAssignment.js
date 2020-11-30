import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class CurrentAssignment extends Component {
  render() {
    return (
      <div>
        <h2>Current Assignment</h2>
        <p>Lorem Ipsum</p>
        {JSON.stringify(this.props.store.assignment)}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(CurrentAssignment);
