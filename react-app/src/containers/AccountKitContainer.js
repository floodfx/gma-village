import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

class AccountKitContainer extends Component {

  componentWillMount() {
    const {initAccountKit} = this.props;
    if(window.AccountKit) {
      initAccountKit();
    } else {
      window.AccountKit_OnInteractive = () => {
        initAccountKit();
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if(!this.props.inited && nextProps.inited) {
      window.AccountKit.init({
        appId: nextProps.appId,
        state: nextProps.csrf,
        version: nextProps.version,
        debug: process.env.NODE_ENV !== 'production' || this.props.debug
      })
    }
  }

  render() {
    return null
  }

}

AccountKitContainer.defaultProps = {
  debug: false
};

AccountKitContainer.propTypes = {
  debug: PropTypes.bool
};

const mapStateToProps = (state) => {
  const { accountKitInit } = state
  return {
    appId: accountKitInit.appId,
    csrf: accountKitInit.csrf,
    version: accountKitInit.version,
    inited: accountKitInit.inited
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountKitContainer)
