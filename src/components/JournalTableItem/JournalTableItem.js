import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// MATERIAL UI
import { TableRow, TableCell } from '@material-ui/core';

class JournalTableItem extends Component {
  journalItemClick = () => {
    console.log('journal item click');
  };

  render() {
    return (
      <TableRow onClick={this.journalItemClick}>
        <TableCell align="center">{this.props.journalItem.date}</TableCell>
        <TableCell align="center">{this.props.journalItem.notes}</TableCell>
        <TableCell align="center"></TableCell>
      </TableRow>
    );
  }
}

export default withRouter(JournalTableItem);
