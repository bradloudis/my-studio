import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withRouter } from 'react-router-dom';

// MATERIAL UI
import {
  Container,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Box,
} from '@material-ui/core';

// CUSTOM COMPONENTS
import JournalTableItem from '../JournalTableItem/JournalTableItem';

class JournalTable extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_ALL_JOURNALS',
    });
  }

  addJournalClick = () => {
    this.props.history.push('/add-journal');
  };

  render() {
    return (
      <Container>
        <h1>Journal Page</h1>
        <Box mb={2}>
          {this.props.store.user.access_level_id === 2 && (
            <Button variant="contained" onClick={this.addJournalClick}>
              ADD PRACTICE JOURNAL
            </Button>
          )}
        </Box>
        {this.props.store.journal.allJournalsReducer.length != 0 ? (
          <TableContainer className="formPanel">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <strong>Date</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Entry</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.store.journal.allJournalsReducer.map(
                  (item, index) => {
                    return <JournalTableItem journalItem={item} key={index} />;
                  }
                )}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <h3>It looks like you don't have any journal entries yet!</h3>
        )}
      </Container>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(JournalTable));
