import React, { Component } from 'react';

// MATERIAL UI
import {
  Button,
  Container,
  Grid,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
} from '@material-ui/core';

class AddJournalForm extends Component {
  state = {
    taskItemOne: null,
    taskItemOneBool: false,
    taskItemTwo: null,
    taskItemTwoBool: false,
    notes: '',
  };

  handleSelectChange = (propertyName) => (event) => {
    this.setState(
      {
        [propertyName]: event.target.value,
      },
      () => {
        console.log(this.state);
      }
    );
  };

  render() {
    return (
      <Container>
        <h2>JOURNAL FORM</h2>
        <Grid container spacing={2}>
          <Grid item>
            <p>
              <strong>Did you?</strong>
            </p>
            <p>
              {this.props.assignment[0] != null &&
                this.props.assignment[0].task_item}
            </p>
          </Grid>
          <Grid item>
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
          <Grid item>
            <p>
              <strong>Did you?</strong>
            </p>
            <p>
              {this.props.assignment[1] != null &&
                this.props.assignment[1].task_item}
            </p>
          </Grid>
          <Grid item>
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
      </Container>
    );
  }
}

export default AddJournalForm;
