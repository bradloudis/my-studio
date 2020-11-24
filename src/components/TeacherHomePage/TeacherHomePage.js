import React, { Component } from 'react';

// MATERIAL UI
import { Button } from '@material-ui/core';

// CUSTOM COMPONENTS
import StudentList from '../StudentList/StudentList';

class TeacherHomePage extends Component {
  addStudentClick = () => {
    console.log('add student clicked');
  };

  render() {
    return (
      <div>
        <h1>TEACHER</h1>
        <h2>My Students</h2>

        <Button variant="contained" onClick={this.addStudentClick}>
          ADD STUDENT
        </Button>
        <StudentList />
      </div>
    );
  }
}

export default TeacherHomePage;
