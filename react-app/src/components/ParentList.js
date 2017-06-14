import React, { Component } from 'react';
import { Link } from 'react-router';
import LoadingIndicator from './LoadingIndicator';
import ParentListRow from './ParentListRow';

class ParentList extends Component {

  render() {
    const {loading, parents} = this.props;
    if (loading) {
      return (
        <LoadingIndicator text="Loading..." />
      )
    }
    else {
      const rows = [];
      var row = [];
      parents.forEach((parent, index) => {
        row.push(parent)
        if(index % 4 == 3 || index === parents.length - 1) {
          rows.push(<ParentListRow parents={row} />);
          row = []
        }
      })
      return (
        <div>
          <div className="w-100 gma-orange-border cf">
            <Link className="btn fr gma-orange-bg mt4 mh4" to="/parent/create">Create Parent</Link>
            <h1 className="gma-orange pl4">Parents <span className="badge">{this.props.parents.length}</span></h1>
            {rows}
          </div>
        </div>
      );
    }
  }


}

export default ParentList
