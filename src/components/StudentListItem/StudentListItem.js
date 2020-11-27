import React, { Component } from 'react';
import './StudentListItem.css';
import { withRouter } from 'react-router-dom';

// MATERIAL-UI
import { Card, CardActionArea } from '@material-ui/core';

class StudentListItem extends Component {
  handleStudentClick = () => {
    console.log('student click!', this.props.student.student_id);
    this.props.history.push(
      `/student-details/${this.props.student.student_id}`
    );
  };

  render() {
    return (
      <Card>
        <CardActionArea onClick={this.handleStudentClick}>
          {this.props.student.profile_picture ? (
            <p>PROFILE PICTURE</p>
          ) : (
            <img
              src={process.env.PUBLIC_URL + '/blank-profile-picture.png'}
              alt="not found"
              className="blankProfileImg"
            />
          )}
          <p>{this.props.student.first_name}</p>
        </CardActionArea>
      </Card>
    );
  }
}

export default withRouter(StudentListItem);
