import React, { Component } from 'react';
import GmaProfile from '../components/GmaProfile'

class GmaProfileContainer extends Component {
  constructor() {
    super();
    this.state = { gma: {} }
  }

  componentDidMount() {
    this.setState({
      gma: {
        first_name: "Gma"
      }
    })
  }

  render() {
    return <GmaProfile gma={this.state.gma} />;
  }
}

export default GmaProfileContainer
