import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class JournalPage extends Component {
  render() {
    return (
      <div>
        {this.props.store.user.access_level_id === 2 ? (
          <h1>Journal Page</h1>
        ) : (
          <h1>Hey, you don't belong here!</h1>
        )}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(JournalPage);
