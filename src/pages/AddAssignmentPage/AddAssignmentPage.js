import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// CUSTOM COMPONENTS
import AddAssignmentForm from '../../components/AddAssignmentForm/AddAssignmentForm';

class AddAssignmentPage extends Component {
  render() {
    return (
      <div>
        {this.props.store.user.access_level_id === 1 ? (
          <AddAssignmentForm />
        ) : (
          <h1>Hey, you don't belong here!</h1>
        )}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AddAssignmentPage);
