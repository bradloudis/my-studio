import React, { Component } from 'react';

class AddJournalForm extends Component {
  render() {
    return (
      <div>
        <h2>JOURNAL FORM</h2>
        <p>
          <strong>Did you?</strong>
          {this.props.assignment[0] != null &&
            this.props.assignment[0].task_item}
        </p>
        <p>
          <strong>Did you?</strong>
          {this.props.assignment[1] != null &&
            this.props.assignment[1].task_item}
        </p>
      </div>
    );
  }
}

export default AddJournalForm;
