import React, { Component } from 'react';
import { connect } from 'react-redux';
// import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';

// CUSTOM COMPONENTS
import TeacherHomePage from '../../components/TeacherHomePage/TeacherHomePage';
import StudentHomePage from '../../components/StudentHomePage/StudentHomePage';

class UserPage extends Component {
  // this component doesn't do much to start, just renders some user info to the DOM
  render() {
    return (
      <div>
        {/* <h1 id="welcome">Welcome, {this.props.store.user.username}!</h1>
        <p>Your ID is: {this.props.store.user.id}</p>
        <LogOutButton className="log-in" /> */}
        {this.props.store.user.access_level_id === 1 ? (
          <TeacherHomePage />
        ) : (
          <StudentHomePage />
        )}
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(UserPage);
