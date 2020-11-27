import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// MATERIAL-UI
import { Container, Grid } from '@material-ui/core';

// CUSTOM COMPONENTS
import TeacherNote from '../../components/TeacherNote/TeacherNote';

class StudentDetailsPage extends Component {
  componentDidMount() {
    // this is the id to send in dispatch to get the details for the individual student!
    // console.log(this.props.match.params.id);
    this.props.dispatch({
      type: 'GET_STUDENT_DETAILS',
      payload: this.props.match.params.id,
    });

    this.props.dispatch({
      type: 'GET_NOTE',
      payload: this.props.match.params.id,
    });
  }

  render() {
    const studentToDisplay = this.props.store.student.studentDetailsReducer;
    return (
      <Container>
        <h1>STUDENT DETAILS PAGE!</h1>
        <Grid container>
          <Grid item xs={4}>
            {studentToDisplay.profile_picture ? (
              <p>PROFILE PICTURE</p>
            ) : (
              <img
                src={process.env.PUBLIC_URL + '/blank-profile-picture.png'}
                alt="not found"
                className="blankProfileImg"
              />
            )}
            <p>
              <strong>Student Name: </strong>
              {studentToDisplay.first_name}
            </p>
            <p>
              <strong>Instrument: </strong>
              {studentToDisplay.instrument}
            </p>
          </Grid>
          <Grid item xs={8}>
            <h2>Next Lesson:</h2>
            <Grid container>
              <Grid item xs={6}>
                <h2>Current Assignment</h2>
                <p>Lorem Ipsum</p>
              </Grid>
              <Grid item xs={6}>
                <TeacherNote />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default connect(mapStoreToProps)(StudentDetailsPage);
