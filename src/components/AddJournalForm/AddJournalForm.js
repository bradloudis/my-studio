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
              <Select>
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
              <Select>
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
