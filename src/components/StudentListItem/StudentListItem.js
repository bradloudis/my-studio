import React, { Component } from 'react';

class StudentListItem extends Component {
  render() {
    return (
      <div>
        <p>{this.props.student.first_name}</p>
      </div>
    );
  }
}

export default StudentListItem;
