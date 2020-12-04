import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// CUSTOM COMPONENTS
import CurrentAssignment from '../CurrentAssignment/CurrentAssignment';

// MATERIAL UI
import { Button, Grid, Container } from '@material-ui/core';

class StudentHomePage extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'GET_ASSIGNMENT_STUDENT' });
  }

  handleEditClick = () => {
    console.log('edit btn click');
    console.log(new Date());
    // TODO AWS S3 upload profile picture
  };

  render() {
    return (
      <Container>
        <h1>STUDENT</h1>
        <Grid container spacing={2} alignItems="flex-start">
          <Grid item xs={4}>
            {this.props.store.user.profile_picture ? (
              <p>PROFILE PICTURE</p>
            ) : (
              <img
                src={process.env.PUBLIC_URL + '/blank-profile-picture.png'}
                alt="not found"
                className="blankProfileImg"
              />
            )}
          </Grid>
          <Grid item xs={8}>
            <h2>
              {this.props.store.user.first_name}{' '}
              {this.props.store.user.last_name}
            </h2>
            <h3>{this.props.store.user.instrument}</h3>
          </Grid>
        </Grid>
        <Button variant="contained" onClick={this.handleEditClick}>
          EDIT
        </Button>
        <CurrentAssignment />
      </Container>
    );
  }
}

export default connect(mapStoreToProps)(StudentHomePage);
