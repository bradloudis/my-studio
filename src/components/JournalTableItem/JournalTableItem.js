import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// MATERIAL UI
import { TableRow, TableCell, Button } from '@material-ui/core';

//import for date/time config
import { DateTime } from 'luxon';

class JournalTableItem extends Component {
  journalItemClick = () => {
    console.log('journal item click', this.props.journalItem.id);
    // push student to Journal Item Detail page
    this.props.history.push(
      `/journal-details/${this.props.journalItem.id}/${this.props.journalItem.assignment_id}`
    );
  };

  render() {
    const date = DateTime.fromISO(this.props.journalItem.date);
    const humanDate = date.toLocaleString(DateTime.DATE_SHORT);
    return (
      <TableRow onClick={this.journalItemClick}>
        <TableCell align="center">{humanDate}</TableCell>
        <TableCell align="center">{this.props.journalItem.notes}</TableCell>
      </TableRow>
    );
  }
}

export default withRouter(JournalTableItem);
