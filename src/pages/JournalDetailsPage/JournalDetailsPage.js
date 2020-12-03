import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withRouter } from 'react-router-dom';

// MATERIAL UI
import { Container } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

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

        {this.props.store.journal.journalTaskItems.map((item, index) => {
          return (
            <div key={index}>
              <p>
                {item.task_item}
                <span>
                  {item.complete_status ? (
                    <DoneIcon></DoneIcon>
                  ) : (
                    <ClearIcon></ClearIcon>
                  )}
                </span>
              </p>
            </div>
          );
        })}
        <p>{this.props.store.journal.journalItemNoteDetails.notes}</p>
      </Container>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(JournalDetailsPage));