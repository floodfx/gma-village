import React, { Component } from 'react';
import { Link } from 'react-router';
import LoadingIndicator from './LoadingIndicator';
import ParentProfile from './ParentProfile';

class ParentListRow extends Component {

  render() {
    const {parents} = this.props;
    return (
      <div className="mw9 center ph3-ns">
        <div className="cf ph2-ns">
          {parents.map((parent) => {
            return <ParentProfile key={parent.id} parent={parent} />;
          })}
        </div>
      </div>
    );
  }


}

export default ParentListRow
