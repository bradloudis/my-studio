import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class StudentList extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_STUDENTS',
    });
  }

  render() {
    return <div>{JSON.stringify(this.props.store.studentReducer)}</div>;
  }
}

export default connect(mapStoreToProps)(StudentList);
