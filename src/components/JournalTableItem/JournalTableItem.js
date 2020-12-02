import React, { Component } from 'react';

import { TableRow, TableCell } from '@material-ui/core';

class JournalTableItem extends Component {
  render() {
    return (
      <TableRow>
        <TableCell align="center">{this.props.journalItem.date}</TableCell>
        <TableCell align="center">{this.props.journalItem.notes}</TableCell>
        <TableCell align="center"></TableCell>
      </TableRow>
    );
  }
}

export default JournalTableItem;
