import React, { Component, PropTypes, Children } from 'react';
import { connect } from 'react-redux';
import Lokka from 'lokka';
import Transport from 'lokka-transport-http';

class GraphQLClientProvider extends Component {

  static childContextTypes = {
    graphQLClient: PropTypes.object.isRequired,
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log("GraphQLClientProvider next props", nextProps)
  // }

  getChildContext() {
    const { auth, url } = this.props;
    var headers = {};
    if(auth.cookie) {
      headers = Object.assign(headers, {Authorization: `Bearer ${auth.cookie.ak_access_token}`});
    }
    var graphQLClient = new Lokka({
      transport: new Transport(url, {credentials: false, headers})
    })
    // console.log("getChildContext GraphQLClientProvider", auth, url, graphQLClient)
    return { graphQLClient }
  }

  render() {
    return Children.only(this.props.children)
  }
}

const mapStateToProps = (state) => {
  const { auth } = state;  
  return {
    auth
  }
}

export default connect(mapStateToProps)(GraphQLClientProvider)
