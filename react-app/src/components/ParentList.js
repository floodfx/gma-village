import React, { Component } from 'react';
import { Link } from 'react-router';
import imgUrl from './ImageUrl';
import LoadingIndicator from './LoadingIndicator';
import ParentProfile from './ParentProfile';

class ParentList extends Component {

  render() {
    const {loading, parents} = this.props;
    if (loading) {
      return (
        <LoadingIndicator text="Loading..." />
      )
    }
    else {
      return (
        <div>
          <div className="w-100 gma-orange-border cf">
          <Link className="btn fr gma-orange-bg mt4 mh4" to="/parent/create">Create Parent</Link>
            <h1 className="gma-orange pl4">Parents <span className="badge">{this.props.parents.length}</span></h1>            
            {parents.map((parent) => {
              return <ParentProfile key={parent.id} parent={parent} />
            })}
          </div>
        </div>
      );
    }
  }


}

export default ParentList
