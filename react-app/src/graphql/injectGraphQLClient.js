import React, { Component, PropTypes } from 'react';

const injectGraphQLClient = (ComponentToWrap) => {

  return class InjectGraphQLClientComponent extends Component {
    // let’s define what’s needed from the `context`
    static contextTypes = {
      graphQLClient: PropTypes.object.isRequired,
    }
    render() {
      const { graphQLClient } = this.context;
      // what we do is basically rendering `ComponentToWrap`
      // with an added `graphQLClient` prop, like a hook
      return (
        <ComponentToWrap {...this.props} graphQLClient={graphQLClient} />
      )
    }
  }

}
export default injectGraphQLClient