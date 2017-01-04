import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRedirect, browserHistory, withRouter } from 'react-router';

import AdminListContainer from './containers/AdminListContainer';
import AdminCreateFormContainer from './containers/AdminCreateFormContainer';

import GmasListContainer from './containers/GmasListContainer';
import GmaProfileContainer from './containers/GmaProfileContainer';
import GmaCreateFormContainer from './containers/GmaCreateFormContainer';

import ParentCreateFormContainer from './containers/ParentCreateFormContainer';

import LoginContainer from './containers/LoginContainer';
import HomeContainer from './containers/HomeContainer';
import ProfileContainer from './containers/ProfileContainer';

import UserNavContainer from './containers/UserNavContainer';
import moment from 'moment'
import './App.css'
import Navi from './Navi'

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

const App = ({ store, authListener }) => {
  return (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={Main}>
          <IndexRedirect to="home" />
          <Route path="/admin/create" component={AdminCreateFormContainer} onEnter={authListener.requireAdmin}/>          
          <Route path="/admin/list" component={AdminListContainer} onEnter={authListener.requireAdmin}/>          
          
          <Route path="/gma/list" component={GmasListContainer} onEnter={authListener.requireParent}/>
          <Route path="/gma/create" component={GmaCreateFormContainer} onEnter={authListener.requireAdmin}/>
          <Route path="/gma/:gmaId" component={GmaProfileContainer} onEnter={authListener.requireParent}/>

          <Route path="/parent/list" component={GmasListContainer} onEnter={authListener.requireParent}/>
          <Route path="/parent/create" component={ParentCreateFormContainer} onEnter={authListener.requireAdmin}/>
          
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
