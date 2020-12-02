import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// MATERIAL UI
import { Button, TextField } from '@material-ui/core';

class AddAssignmentForm extends Component {
  state = {
    taskItemOne: '',
    taskItemTwo: '',
    teacherNotes: '',
  };

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  handleBackClick = () => {
    this.props.history.push(`/student-details/${this.props.studentId}`);
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.dispatch({
      type: 'SAVE_ASSIGNMENT',
      payload: {
        taskItemOne: this.state.taskItemOne,
        taskItemTwo: this.state.taskItemTwo,
        teacherNotes: this.state.teacherNotes,
        studentId: this.props.studentId,
      },
    });

    // navigate Teacher back to the details page for this particular student
    this.props.history.push(`/student-details/${this.props.studentId}`);
  };

  render() {
    return (
      <form className="formPanel" onSubmit={this.handleSubmit}>
        <h2>Add Assignment!</h2>
        <div>
          <TextField
            label="task one"
            value={this.state.taskItemOne}
            onChange={this.handleInputChangeFor('taskItemOne')}
            required
          />
        </div>
        <div>
          <TextField
            label="task two"
            value={this.state.taskItemTwo}
            onChange={this.handleInputChangeFor('taskItemTwo')}
            required
          />
        </div>
        <div>
          <TextField
            label="notes"
            value={this.state.teacherNotes}
            onChange={this.handleInputChangeFor('teacherNotes')}
            multiline
            rows={4}
            required
          />
        </div>
        <div>
          <Button variant="contained" onClick={this.handleBackClick}>
            BACK
          </Button>
          <Button type="submit" variant="contained">
            SUBMIT
          </Button>
        </div>
      </form>
    );
  }
}

export default withRouter(connect()(AddAssignmentForm));
