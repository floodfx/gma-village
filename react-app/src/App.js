import Navi from './Navi'
import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Link, Router, Route, IndexRedirect, browserHistory } from 'react-router';
import GmasListContainer from './containers/GmasListContainer';
import GmaProfileContainer from './containers/GmaProfileContainer';
import './App.css'

const Header = ({children}) => (
  <div className="container">
    <Navi />
    {children}
  </div>
)

const App = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Header}>
        <IndexRedirect to="/gmas" />
        <Route path="gmas" component={GmasListContainer}/>
        <Route path="/gma/:gmaId" component={GmaProfileContainer} />
      </Route>
    </Router>
  </Provider>
);

App.propTypes = {
  store: PropTypes.object.isRequired,
};

export default App;
