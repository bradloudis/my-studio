import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// CUSTOM COMPONENTS
import CurrentAssignment from '../../components/CurrentAssignment/CurrentAssignment';

// MATERIAL UI
import { Container, Box } from '@material-ui/core';

class AddJournalPage extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'GET_ASSIGNMENT_STUDENT' });
  }

  render() {
    return (
      <Container>
        {this.props.store.user.access_level_id === 2 ? (
          <Box>
            <h1>Add Journal Entry</h1>
            <CurrentAssignment />
          </Box>
        ) : (
          <h1>Hey, you don't belong here!</h1>
        )}
      </Container>
    );
  }
}

export default connect(mapStoreToProps)(AddJournalPage);
