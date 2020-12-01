import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class JournalTable extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_ALL_JOURNALS',
    });
  }

  render() {
    return (
      <div>
        <h1>Journal Page</h1>
        <p>hello, testing</p>
        {JSON.stringify(this.props.store.journal)}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(JournalTable);
