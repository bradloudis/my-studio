import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class CurrentAssignment extends Component {
  render() {
    return (
      <div>
        <h2>Current Assignment</h2>
        <h4>Tasks:</h4>
        <ul>
          <li>
            {this.props.store.assignment[0] != null &&
              this.props.store.assignment[0].task_item}
          </li>
          <li>
            {this.props.store.assignment[1] != null &&
              this.props.store.assignment[1].task_item}
          </li>
        </ul>
        <h4>Notes:</h4>
        <p>
          {this.props.store.assignment[0] != null &&
            this.props.store.assignment[1].teacher_notes}
        </p>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(CurrentAssignment);
