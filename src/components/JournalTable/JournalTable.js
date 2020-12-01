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
        <p>hello, testing</p>
        {JSON.stringify(this.props.store.journal)}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Entry</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </Container>
    );
  }
}

export default connect(mapStoreToProps)(JournalTable);
