import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import GmasListContainer from './containers/GmasListContainer';
import GmaProfileContainer from './containers/GmaProfileContainer';
import moment from 'moment'
import './App.css'
import Navi from './Navi'

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
