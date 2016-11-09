import logo from './logo.svg';
import './App.css';
import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import GmasListContainer from './containers/GmasListContainer';
import GmaProfileContainer from './containers/GmaProfileContainer';

const Header = ({children}) => (
  <div className="App">
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>Welcome to Gma</h2>
    </div>
    <p className="App-intro">
      To get started, edit <code>src/App.js</code> and save to reload.
    </p>
    {children}
  </div>
)

const App = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Header}>
        <Route path="gmas" component={GmasListContainer}>
          <Route path="profile" component={GmaProfileContainer}/>
        </Route>
      </Route>
    </Router>
  </Provider>
);

App.propTypes = {
  store: PropTypes.object.isRequired,
};

export default App;
