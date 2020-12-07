import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withRouter } from 'react-router-dom';

// MATERIAL-UI
import { Container, Grid, Button } from '@material-ui/core';

// CUSTOM COMPONENTS
import TeacherNote from '../../components/TeacherNote/TeacherNote';
import CurrentAssignment from '../../components/CurrentAssignment/CurrentAssignment';
import JournalTable from '../../components/JournalTable/JournalTable';

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

    this.props.dispatch({
      type: 'GET_ASSIGNMENT_TEACHER',
      payload: this.props.match.params.id,
    });

    this.props.dispatch({
      type: 'GET_JOURNALS_TEACHER',
      payload: this.props.match.params.id,
    });
  }

  addNewAssignmentClick = () => {
    console.log('btn click. student id: ', this.props.match.params.id);
    this.props.history.push(`/add-assignment/${this.props.match.params.id}`);
  };

  backBtnClick = () => {
    this.props.history.push('/user');
  };

  render() {
    const studentToDisplay = this.props.store.student.studentDetailsReducer;
    return (
      <Container>
        <h1>STUDENT DETAILS</h1>
        <Grid container>
          <Grid item xs={4}>
            {studentToDisplay.profile_picture ? (
              <img
                src={
                  process.env.PUBLIC_URL + `${studentToDisplay.profile_picture}`
                }
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
            <p>
              <strong>Student Name: </strong>
              {studentToDisplay.first_name}
            </p>
            <p>
              <strong>Instrument: </strong>
              {studentToDisplay.instrument}
            </p>
            <Button variant="contained" onClick={this.backBtnClick}>
              BACK
            </Button>
          </Grid>
          <Grid item xs={8}>
            <h2>Next Lesson:</h2>
            <Grid container>
              <Grid item xs={6}>
                <CurrentAssignment />
                <Button
                  variant="contained"
                  onClick={this.addNewAssignmentClick}
                >
                  ADD NEW ASSIGNMENT
                </Button>
              </Grid>
              <Grid item xs={6}>
                <TeacherNote studentId={this.props.match.params.id} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <JournalTable />
      </Container>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(StudentDetailsPage));
