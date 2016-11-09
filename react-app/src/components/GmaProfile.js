import React, { Component } from 'react';

class GmaProfile extends Component {

  render() {
    return <ul> {this.props.gma.first_name} </ul>;
  }

}

export default GmaProfile
