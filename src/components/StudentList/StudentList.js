import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// CUSTOM COMPONENTS
import StudentListItem from '../StudentListItem/StudentListItem';

// MATERIAL-UI
import { Grid } from '@material-ui/core';

class StudentList extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_STUDENTS',
    });
  }

  render() {
    return (
      <Grid container spacing={6} justify="flex-start">
        {this.props.store.student.studentListReducer.map((item, index) => {
          return (
            <Grid item key={index} xs={4}>
              <StudentListItem student={item} />
            </Grid>
          );
        })}
      </Grid>
    );
  }
}

export default connect(mapStoreToProps)(StudentList);
