import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withRouter } from 'react-router-dom';

// MATERIAL UI
import { Container, Box, Grid, Button } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

class JournalDetailsPage extends Component {
  componentDidMount() {
    // this is the id to send in dispatch to get the details for the individual student!
    // console.log(this.props.match.params.id);

    // gets the student note and tasks for journal item
    this.props.dispatch({
      type: 'GET_JOURNAL_NOTE_DETAILS',
      payload: {
        journalId: this.props.match.params.id,
        assignmentId: this.props.match.params.assignmentId,
      },
    });
  }

  handleBackClick = () => {
    this.props.history.push('/journal');
  };

  handleDeleteClick = () => {
    const idArray = [
      parseInt(this.props.match.params.id),
      this.props.store.journal.journalTaskItems[0].id,
      this.props.store.journal.journalTaskItems[1].id,
    ];
    this.props.dispatch({
      type: 'DELETE_JOURNAL_ITEM',
      payload: idArray,
    });
    // this.props.history.push('/journal');
  };

  render() {
    return (
      <Container>
        <Grid container justify="space-evenly">
          <Grid item>
            <h1>JournalDetailsPage</h1>
            <Box mb={2}>
              <Button variant="contained" onClick={this.handleBackClick}>
                BACK
              </Button>
            </Box>
            <Box className="formPanel">
              <Grid container justify="space-evenly">
                <Grid item>
                  {this.props.store.journal.journalTaskItems.map(
                    (item, index) => {
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
                    }
                  )}
                  <p>{this.props.store.journal.journalItemNoteDetails.notes}</p>
                </Grid>
              </Grid>
              <Box mt={3}>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Button>
                      <EditIcon />
                    </Button>
                    <Button>
                      <DeleteIcon onClick={this.handleDeleteClick} />
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(JournalDetailsPage));
