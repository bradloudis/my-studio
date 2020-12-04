import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// MATERIAL UI
import { TableRow, TableCell, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

class JournalTableItem extends Component {
  journalItemClick = () => {
    console.log('journal item click', this.props.journalItem.id);
    // push student to Journal Item Detail page
    this.props.history.push(`/journal-details/${this.props.journalItem.id}`);
  };

  handleDeleteClick = () => {
    console.log(this.props.journalItem.id);
  };

  render() {
    return (
      <TableRow onClick={this.journalItemClick}>
        <TableCell align="center">{this.props.journalItem.date}</TableCell>
        <TableCell align="center">{this.props.journalItem.notes}</TableCell>
        <TableCell align="center">
          <Button>
            <EditIcon />
          </Button>
          <Button>
            <DeleteIcon onClick={this.handleDeleteClick} />
          </Button>
        </TableCell>
      </TableRow>
    );
  }
}

export default withRouter(JournalTableItem);
