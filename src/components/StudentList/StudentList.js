import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// CUSTOM COMPONENTS
import StudentListItem from '../StudentListItem/StudentListItem';

class StudentList extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_STUDENTS',
    });
  }

  render() {
    return (
      <div>
        {this.props.store.studentReducer.map((item, index) => {
          return <StudentListItem key={index} student={item} />;
        })}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(StudentList);
