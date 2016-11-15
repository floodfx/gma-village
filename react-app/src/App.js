import Navi from './Navi'
import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import GmasListContainer from './containers/GmasListContainer';
import GmaProfileContainer from './containers/GmaProfileContainer';
import moment from 'moment'
import './App.css'

const Footer = () => {
  return (
    <div>
      <hr />
      <footer className="footer">
        <div className="container">
          <p className="text-center text-muted">&copy; Gma Village {moment().format('YYYY')}</p>
        </div>
      </footer>
    </div>
  )
}

const Main = ({children}) => (
  <div className="container">
    <Navi />
    {children}
    <Footer />
  </div>
)

const App = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Main}>
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
