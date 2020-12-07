import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// CUSTOM COMPONENTS
import JournalTable from '../../components/JournalTable/JournalTable';

class JournalPage extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_ALL_JOURNALS',
    });
  }
  render() {
    return (
      <div>
        {this.props.store.user.access_level_id === 2 ? (
          <JournalTable />
        ) : (
          <h1>Hey, you don't belong here!</h1>
        )}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(JournalPage);
