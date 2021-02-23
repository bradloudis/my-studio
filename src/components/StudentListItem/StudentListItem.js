import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// MATERIAL-UI
import { Card, CardActionArea, CardContent, Box } from '@material-ui/core';

class StudentListItem extends Component {
  handleStudentClick = () => {
    // console.log('student click!', this.props.student.student_id);
    this.props.history.push(
      `/student-details/${this.props.student.student_id}`
    );
  };

  render() {
    return (
      <Card>
        <CardContent>
          <CardActionArea onClick={this.handleStudentClick}>
            {this.props.student.profile_picture_path ? (
              <img
                src={this.props.student.profile_picture_path}
                alt="not found"
                className="profilePicture"
              />
            ) : (
              <img
                src={process.env.PUBLIC_URL + '/blank-profile-picture.png'}
                alt="not found"
                className="profilePicture"
              />
            )}

            <h4>
              {this.props.student.first_name} {this.props.student.last_name}
            </h4>
          </CardActionArea>
        </CardContent>
      </Card>
    );
  }
}

export default withRouter(StudentListItem);
