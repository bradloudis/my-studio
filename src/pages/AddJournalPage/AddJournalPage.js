import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withRouter } from 'react-router-dom';

// CUSTOM COMPONENTS
import CurrentAssignment from '../../components/CurrentAssignment/CurrentAssignment';
import AddJournalForm from '../../components/AddJournalForm/AddJournalForm';

// MATERIAL UI
import { Container, Box, Grid, Button } from '@material-ui/core';

class AddJournalPage extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'GET_ASSIGNMENT_STUDENT' });
  }

  handleBackClick = () => {
    this.props.history.push('/journal');
  };
  render() {
    return (
      <Container>
        {this.props.store.user.access_level_id === 2 ? (
          <Box>
            <h1>Add Journal Entry</h1>
            <Box mb={2}>
              <Button variant="contained" onClick={this.handleBackClick}>
                BACK
              </Button>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <CurrentAssignment />
              </Grid>
              <Grid item xs={9}>
                <AddJournalForm assignment={this.props.store.assignment} />
              </Grid>
            </Grid>
          </Box>
        ) : (
          <h1>Hey, you don't belong here!</h1>
        )}
      </Container>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(AddJournalPage));
