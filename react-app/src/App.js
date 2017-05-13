import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRedirect, browserHistory, withRouter } from 'react-router';

import AdminListContainer from './containers/AdminListContainer';
import AdminCreateFormContainer from './containers/AdminCreateFormContainer';
import AdminEditFormContainer from './containers/AdminEditFormContainer';

import GmasListContainer from './containers/GmasListContainer';
import GmaProfileContainer from './containers/GmaProfileContainer';
import GmaCreateFormContainer from './containers/GmaCreateFormContainer';
import GmaEditFormContainer from './containers/GmaEditFormContainer';

import ParentListContainer from './containers/ParentListContainer';
import ParentCreateFormContainer from './containers/ParentCreateFormContainer';
import ParentEditFormContainer from './containers/ParentEditFormContainer';

import CareNeedFormContainer from './containers/CareNeedFormContainer';

import LoginContainer from './containers/LoginContainer';
import HomeContainer from './containers/HomeContainer';
import ProfileContainer from './containers/ProfileContainer';

import UserNavContainer from './containers/UserNavContainer';
import moment from 'moment'
import './App.css'
import Navi from './Navi';

const UserNavContainerWithRouter = withRouter(UserNavContainer, { withRef: true })

const Footer = () => {
  return (
    <div className="row">
      <footer className="footer">
        <div className="container">
          <div className="col-md-12 col-sm-8">
            <hr />
            <p className="text-center gma-orange">&copy; Gma Village {moment().format('YYYY')}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

const Main = ({children}) => (
  <div className="container">
    <Navi />
    <UserNavContainerWithRouter />
    {children}
    <Footer />
  </div>
)

browserHistory.listen(function (location) {
  if (process.env.NODE_ENV === 'production') {
    if(window.FB && window.FB.AppEvents) {
      try {
        window.FB.AppEvents.logPageView();
      } catch(e){}
    }
  }
  // window.ga('send', 'pageview', location.pathname);
});

const App = ({ store, authListener }) => {
  return (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={Main}>
          <IndexRedirect to="home" />
          <Route path="/admin/create" component={AdminCreateFormContainer} onEnter={authListener.requireAdmin}/>
          <Route path="/admin/list" component={AdminListContainer} onEnter={authListener.requireAdmin}/>
          <Route path="/admin/edit/:adminId" component={AdminEditFormContainer} onEnter={authListener.requireAdmin}/>

          <Route path="/gma/list" component={GmasListContainer} onEnter={authListener.requireUser}/>
          <Route path="/gma/create" component={GmaCreateFormContainer} onEnter={authListener.requireAdmin}/>
          <Route path="/gma/edit/:gmaId" component={GmaEditFormContainer} onEnter={authListener.requireAdmin}/>
          <Route path="/gma/:gmaId" component={GmaProfileContainer} onEnter={authListener.requireUser}/>

          <Route path="/parent/list" component={ParentListContainer} onEnter={authListener.requireAdmin}/>
          <Route path="/parent/create" component={ParentCreateFormContainer} onEnter={authListener.requireAdmin}/>
          <Route path="/parent/edit/:parentId" component={ParentEditFormContainer} onEnter={authListener.requireAdmin}/>

          <Route path="/careNeed/create" component={CareNeedFormContainer} onEnter={authListener.requireParent}/>
          <Route path="/careNeed/create/:parentId" component={CareNeedFormContainer} onEnter={authListener.requireParent}/>

          <Route path="/login" component={LoginContainer}/>
          <Route path="/home" component={HomeContainer} onEnter={authListener.requireUser}/>
          <Route path="/profile" component={ProfileContainer} onEnter={authListener.requireUser}/>
        </Route>
      </Router>
    </Provider>
  )
}

App.propTypes = {
  store: PropTypes.object.isRequired,
};

export default App;
