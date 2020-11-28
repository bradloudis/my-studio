import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// MATERIAL UI
import { Button } from '@material-ui/core';

class TeacherNote extends Component {
  state = {
    displayEditField: false,
  };

  handleBtnClick = () => {
    if (!this.state.displayEditField) {
      this.setState({
        displayEditField: true,
      });
    } else {
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
          <Button variant="contained" onClick={this.handleBtnClick}>
            SAVE
          </Button>
        ) : (
          <div>
            <p>{this.props.store.teacherNote.note}</p>
            <Button variant="contained" onClick={this.handleBtnClick}>
              ADD/EDIT
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(TeacherNote);
