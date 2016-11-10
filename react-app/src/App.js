import './App.css';
import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Link, Router, Route, browserHistory } from 'react-router';
import GmasListContainer from './containers/GmasListContainer';
import GmaProfileContainer from './containers/GmaProfileContainer';


const Header = ({children}) => (
  <div className="App">
    <h1>Welcome to Gma Village</h1>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/gmas">Gmas</Link></li>
    </ul>
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
