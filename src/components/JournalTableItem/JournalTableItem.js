import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// MATERIAL UI
import { TableRow, TableCell } from '@material-ui/core';

class JournalTableItem extends Component {
  journalItemClick = () => {
    console.log('journal item click', this.props.journalItem.id);
    // push student to Journal Item Detail page
    this.props.history.push(`/journal-details/${this.props.journalItem.id}`);
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
