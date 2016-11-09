import React, { Component } from 'react';

class GmasList extends Component {

  render() {
    return <ul>{this.props.gmas.map(this.renderGma)} </ul>;
  }

  renderGma({id, first_name}) {
    return <li key={id}>{first_name}</li>;
  }

}

export default GmasList
