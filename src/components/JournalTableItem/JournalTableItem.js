import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// MATERIAL UI
import { TableRow, TableCell } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';

//import for date/time config
import { DateTime } from 'luxon';

const StyledTableRow = withStyles((theme) => ({
  hover: {
    backgroundColor: indigo,
    color: theme.palette.common.white,
  },
}))(TableRow);

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
      <StyledTableRow onClick={this.journalItemClick}>
        <TableCell align="center">{humanDate}</TableCell>
        <TableCell align="center">{this.props.journalItem.notes}</TableCell>
      </StyledTableRow>
    );
  }
}

export default withRouter(JournalTableItem);
