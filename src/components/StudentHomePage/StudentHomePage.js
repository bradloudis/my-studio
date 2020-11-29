import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// MATERIAL UI
import { Button, Grid, Container } from '@material-ui/core';

class StudentHomePage extends Component {
  handleEditClick = () => {
    console.log('edit btn click');
    // TODO AWS S3 upload profile picture
  };

  render() {
    return (
      <Container>
        <h1>STUDENT</h1>
        <Grid container spacing={2}>
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
      </Container>
    );
  }
}

export default connect(mapStoreToProps)(StudentHomePage);
