import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class CurrentAssignment extends Component {
  render() {
    return (
      <div>
        <h2>Current Assignment</h2>
        {JSON.stringify(this.props.store.assignment)}
        {JSON.stringify(this.props.store.assignment[0])}
        <ul>{/* <li>{this.props.store.assignment[0].task_item}</li> */}</ul>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(CurrentAssignment);
