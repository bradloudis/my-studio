import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// MATERIAL UI
import { Button, TextField } from '@material-ui/core';

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

  handleBtnClick = () => {
    if (!this.state.displayEditField) {
      this.setState({
        displayEditField: true,
      });
    } else {
      // send a dispatch of the new note
      // this.props.dispatch({
      //   type: 'SAVE_NOTE',
      //   payload: {
      //     studentId: this.props.match.params.id,
      //     note: this.state.note,
      //   },
      // });
      console.log(this.props.studentId);
      // toggle state
      this.setState({
        displayEditField: false,
      });
    }
  };

  render() {
    return (
      <div>
        <h2>Notes</h2>

        {this.state.displayEditField ? (
          <div>
            <TextField
              label="note"
              value={this.state.note}
              onChange={this.handleInputChangeFor('note')}
            />
            <Button variant="contained" onClick={this.handleBtnClick}>
              SAVE
            </Button>
          </div>
        ) : (
          <div>
            <p>{this.props.store.teacherNote.note}</p>
            {this.props.store.teacherNote.note ? (
              <Button variant="contained">EDIT</Button>
            ) : (
              <Button variant="contained" onClick={this.handleBtnClick}>
                ADD
              </Button>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(TeacherNote);
