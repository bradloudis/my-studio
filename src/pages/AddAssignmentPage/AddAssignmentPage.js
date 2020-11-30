import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// CUSTOM COMPONENTS
import AddAssignmentForm from '../../components/AddAssignmentForm/AddAssignmentForm';

class AddAssignmentPage extends Component {
  state = {
    studentId: this.props.match.params.id,
  };
  render() {
    return (
      <div>
        {this.props.store.user.access_level_id === 1 ? (
          <AddAssignmentForm studentId={this.state.studentId} />
        ) : (
          <h1>Hey, you don't belong here!</h1>
        )}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AddAssignmentPage);
