import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// CUSTOM COMPONENTS
import CurrentAssignment from '../CurrentAssignment/CurrentAssignment';
import ImageUpload from '../ImageUpload/ImageUpload';

// MATERIAL UI
import { Button, Grid, Container, Box } from '@material-ui/core';

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
        <Grid container justify="space-evenly" alignItems="center">
          <Grid item xs={6}>
            <Box>
              <h1>STUDENT</h1>
              <h2>
                {this.props.store.user.first_name}{' '}
                {this.props.store.user.last_name}
              </h2>
              <h3>{this.props.store.user.instrument}</h3>
            </Box>
            <Box>
              {this.props.store.user.profile_picture_path ? (
                <img
                  src={
                    process.env.PUBLIC_URL +
                    `${this.props.store.user.profile_picture_path}`
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
            </Box>
            <Button variant="contained" onClick={this.handleEditClick}>
              <ImageUpload />
            </Button>
          </Grid>
          <Grid item xs={6}>
            <CurrentAssignment />
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default connect(mapStoreToProps)(StudentHomePage);
