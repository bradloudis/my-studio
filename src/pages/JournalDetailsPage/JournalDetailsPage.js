import React, { Component } from 'react';

class JournalDetailsPage extends Component {
  render() {
    return (
      <div>
        <h1>JournalDetailsPage</h1>
        {JSON.stringify(this.props.match.params.id)}
      </div>
    );
  }
}

export default JournalDetailsPage;
