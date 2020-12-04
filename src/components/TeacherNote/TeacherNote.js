import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// MATERIAL UI
import { Button, TextField, Box } from '@material-ui/core';

class TeacherNote extends Component {
  state = {
    displayEditField: false,
    note: '',
  };

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  handleAddClick = () => {
    // toggle state to true. edit form will render on page
    this.setState({
      displayEditField: true,
    });
  };

  handleEditClick = () => {
    // toggle state to true. edit form will render on page
    this.setState({
      displayEditField: true,
    });
  };

  handleCancelClick = () => {
    // toggle state to false. teacher note will render on page
    this.setState({
      displayEditField: false,
    });
  };

  handleSaveClick = () => {
    // send a dispatch of the new note
    this.props.dispatch({
      type: 'SAVE_NOTE',
      payload: {
        studentId: this.props.studentId,
        note: this.state.note,
      },
    });
    // toggle state to false. teacher's note will render on page
    this.setState({
      displayEditField: false,
    });
  };

  handleUpdateClick = () => {
    // send a dispatch of the new note
    this.props.dispatch({
      type: 'UPDATE_NOTE',
      payload: {
        studentId: this.props.studentId,
        note: this.state.note,
      },
    });
    // toggle state to false. teacher's note will render on page
    this.setState({
      displayEditField: false,
    });
  };

  render() {
    return (
      <div className="formPanel">
        <h2>Notes</h2>

        {this.state.displayEditField ? (
          <div>
            <TextField
              label={this.props.store.teacherNote.note}
              multiline
              rows={4}
              fullWidth
              value={this.state.note}
              onChange={this.handleInputChangeFor('note')}
            />
            <Box mt={2}>
              <Box component="span" mr={1}>
                <Button variant="contained" onClick={this.handleCancelClick}>
                  CANCEL
                </Button>
              </Box>
              {this.props.store.teacherNote.note ? (
                <Button variant="contained" onClick={this.handleUpdateClick}>
                  UPDATE
                </Button>
              ) : (
                <Button variant="contained" onClick={this.handleSaveClick}>
                  SAVE
                </Button>
              )}
            </Box>
          </div>
        ) : (
          <div>
            <p>{this.props.store.teacherNote.note}</p>
            {this.props.store.teacherNote.note ? (
              <Box mt={2}>
                <Button variant="contained" onClick={this.handleEditClick}>
                  EDIT
                </Button>
              </Box>
            ) : (
              <Box mt={2}>
                <Button variant="contained" onClick={this.handleAddClick}>
                  ADD
                </Button>
              </Box>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(TeacherNote);
