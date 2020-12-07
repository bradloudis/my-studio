import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withRouter } from 'react-router-dom';

// SWEET ALERT
import Swal from 'sweetalert2';
// MATERIAL UI
import {
  Button,
  Container,
  Grid,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  TextField,
} from '@material-ui/core';

class AddJournalForm extends Component {
  state = {
    taskItemOneBool: false,
    taskItemTwoBool: false,
    notes: '',
  };

  handleSelectChange = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  handleClickSubmit = () => {
    this.props.dispatch({
      type: 'SUBMIT_JOURNAL_ENTRY',
      payload: {
        ...this.state,
        taskItemOneId: this.props.assignment[0].id,
        taskItemTwoId: this.props.assignment[1].id,
        assignmentId: this.props.assignment[0].assignment_id,
      },
    });
    Swal.fire({
      title: 'Nice!',
      text: `Way to go ${this.props.store.user.first_name}!`,
    });
    this.props.history.push('/journal');
  };

  render() {
    return (
      <Container className="formPanel">
        <h2>JOURNAL FORM</h2>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={9}>
                <p>
                  <strong>Did you?</strong>
                </p>
                <p>
                  {this.props.assignment[0] != null &&
                    this.props.assignment[0].task_item}
                </p>
              </Grid>
              <Grid item xs={3}>
                <FormControl>
                  <InputLabel>yes/no</InputLabel>
                  <Select
                    value={this.state.taskItemOneBool}
                    onChange={this.handleSelectChange('taskItemOneBool')}
                  >
                    <MenuItem value={true}>yes</MenuItem>
                    <MenuItem value={false}>no</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={9}>
                <p>
                  <strong>Did you?</strong>
                </p>
                <p>
                  {this.props.assignment[1] != null &&
                    this.props.assignment[1].task_item}
                </p>
              </Grid>
              <Grid item xs={3}>
                <FormControl>
                  <InputLabel>yes/no</InputLabel>
                  <Select
                    value={this.state.taskItemTwoBool}
                    onChange={this.handleSelectChange('taskItemTwoBool')}
                  >
                    <MenuItem value={true}>yes</MenuItem>
                    <MenuItem value={false}>no</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={8}>
            <TextField
              label="note"
              multiline
              rows={8}
              fullWidth
              value={this.state.notes}
              onChange={this.handleInputChangeFor('notes')}
            />
          </Grid>
        </Grid>
        <Button variant="contained" onClick={this.handleClickSubmit}>
          SUBMIT
        </Button>
      </Container>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(AddJournalForm));
