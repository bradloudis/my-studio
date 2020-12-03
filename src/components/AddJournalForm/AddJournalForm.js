import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

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
    taskItemOneBool: false,
    taskItemTwoBool: false,
    notes: '',
  };

  handleSelectChange = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  handleClickSubmit = () => {
    this.props.dispatch({
      type: 'SUBMIT_JOURNAL_ENTRY',
      payload: {
        ...this.state,
        taskItemOne: this.props.assignment[0].task_item,
        taskItemTwo: this.props.assignment[1].task_item,
      },
    });
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
        <Button variant="contained" onClick={this.handleClickSubmit}>
          SUBMIT
        </Button>
      </Container>
    );
  }
}

export default connect(mapStoreToProps)(AddJournalForm);
