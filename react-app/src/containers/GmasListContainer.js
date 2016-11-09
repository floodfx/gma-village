import React, { Component } from 'react';
import GmasList from '../components/GmasList'

class GmasListContainer extends Component {
  constructor() {
    super();
    this.state = { gmas: [] }
  }

  componentDidMount() {
    this.setState({
      gmas: [
        {id:"a",first_name: "Gma 1"},
        {id:"b",first_name: "Gma 2"}
      ]
    })
  }

  render() {
    return (
      <div>
        <span>Gmas</span>
        <GmasList gmas={this.state.gmas} />
        {this.props.children}
      </div>
    );
  }
}

export default GmasListContainer
