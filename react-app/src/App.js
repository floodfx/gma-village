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

import LoginContainer from './containers/LoginContainer';
import HomeContainer from './containers/HomeContainer';
import ProfileContainer from './containers/ProfileContainer';

import UserNavContainer from './containers/UserNavContainer';
import moment from 'moment'
import './App.css'
import Navi from './Navi';
import GraphQLClientProvider from './graphql/GraphQLClientProvider'

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

const prod = process.env.NODE_ENV === 'production'
const url = 
  prod ? 
    'https://gma-village-graphql-prod-dot-gma-village.appspot.com/graphql' 
    : 
    'http://localhost:8080/graphql'

const App = ({ store, authListener }) => {
  return (
    <Provider store={store}>    
      <GraphQLClientProvider url={url}>  
        <Router history={browserHistory}>
          <Route path="/" component={Main}>
            <IndexRedirect to="home" />
            <Route path="/admin/create" component={AdminCreateFormContainer} onEnter={authListener.requireAdmin}/>
            <Route path="/admin/list" component={AdminListContainer} onEnter={authListener.requireAdmin}/>
            <Route path="/admin/edit/:adminId" component={AdminEditFormContainer} onEnter={authListener.requireAdmin}/>
            
            <Route path="/gma/list" component={GmasListContainer} onEnter={authListener.requireParent}/>
            <Route path="/gma/create" component={GmaCreateFormContainer} onEnter={authListener.requireAdmin}/>          
            <Route path="/gma/edit/:gmaId" component={GmaEditFormContainer} onEnter={authListener.requireAdmin}/>
            <Route path="/gma/:gmaId" component={GmaProfileContainer} onEnter={authListener.requireParent}/>

            <Route path="/parent/list" component={ParentListContainer} onEnter={authListener.requireAdmin}/>
            <Route path="/parent/create" component={ParentCreateFormContainer} onEnter={authListener.requireAdmin}/>
            <Route path="/parent/edit/:parentId" component={ParentEditFormContainer} onEnter={authListener.requireAdmin}/>
            
            <Route path="/login" component={LoginContainer}/>
            <Route path="/home" component={HomeContainer} onEnter={authListener.requireUser}/>
            <Route path="/profile" component={ProfileContainer} onEnter={authListener.requireUser}/>
          </Route>
        </Router>
      </GraphQLClientProvider>
    </Provider>
  )
}

App.propTypes = {
  store: PropTypes.object.isRequired,
};

export default App;
