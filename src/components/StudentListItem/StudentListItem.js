import React, { Component } from 'react';

class StudentListItem extends Component {
  render() {
    return (
      <div>
        {this.props.student.profile_picture ? (
          <p>PROFILE PICTURE</p>
        ) : (
          <img
            src={process.env.PUBLIC_URL + '/blank-profile-picture.png'}
            alt="no profile image found"
          />
        )}
        <p>{this.props.student.first_name}</p>
      </div>
    );
  }
}

export default StudentListItem;
