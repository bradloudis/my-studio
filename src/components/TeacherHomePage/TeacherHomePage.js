import React, { Component } from 'react';

// CUSTOM COMPONENTS
import StudentList from '../StudentList/StudentList';

class TeacherHomePage extends Component {
  render() {
    return (
      <div>
        <h1>TEACHER</h1>
        <h2>My Students</h2>
        <StudentList />
      </div>
    );
  }
}

export default TeacherHomePage;
