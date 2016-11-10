import React, { Component } from 'react';

class GmasList extends Component {

  componentWillMount() {
    console.log("props", this.props)
  }

  render() {
    return <ul>{this.props.gmas.map(this.renderGma)} </ul>;
  }

  renderGma({id}) {
    return <li key={id}>{id}</li>;
  }

}

export default GmasList
