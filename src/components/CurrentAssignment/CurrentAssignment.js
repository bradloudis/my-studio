import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class CurrentAssignment extends Component {
  render() {
    return (
      <div className="formPanel">
        <h2>Current Assignment</h2>
        {/* checking to see if there is an assignment before rendering to page */}
        {this.props.store.assignment[0] != null && (
          <div>
            <h4>Tasks:</h4>
            <ul>
              <li>{this.props.store.assignment[0].task_item}</li>
              <li>{this.props.store.assignment[1].task_item}</li>
            </ul>
            <h4>Notes:</h4>
            <p>{this.props.store.assignment[1].teacher_notes}</p>
          </div>
        )}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(CurrentAssignment);
