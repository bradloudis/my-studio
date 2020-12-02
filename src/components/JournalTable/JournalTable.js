import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// MATERIAL UI
import {
  Container,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';

// CUSTOM COMPONENTS
import JournalTableItem from '../JournalTableItem/JournalTableItem';

class JournalTable extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_ALL_JOURNALS',
    });
  }

  render() {
    return (
      <Container>
        <h1>Journal Page</h1>
        {this.props.store.journal.length != 0 ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Entry</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.store.journal.map((item, index) => {
                  return <JournalTableItem journalItem={item} key={index} />;
                })}
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

export default connect(mapStoreToProps)(JournalTable);
