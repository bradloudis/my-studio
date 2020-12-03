import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withRouter } from 'react-router-dom';

// MATERIAL UI
import { Container } from '@material-ui/core';

class JournalDetailsPage extends Component {
  componentDidMount() {
    // this is the id to send in dispatch to get the details for the individual student!
    // console.log(this.props.match.params.id);

    // gets the student note for journal item
    this.props.dispatch({
      type: 'GET_JOURNAL_NOTE_DETAILS',
      payload: this.props.match.params.id,
    });

    // gets the tasks for journal item
    this.props.dispatch({
      type: 'GET_JOURNAL_TASK_ITEMS',
      payload: this.props.match.params.id,
    });
  }
  render() {
    return (
      <Container>
        <h1>JournalDetailsPage</h1>
        {JSON.stringify(this.props.match.params.id)}
      </Container>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(JournalDetailsPage));
