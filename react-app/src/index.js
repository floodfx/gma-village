import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import gmasList from './reducers/GmasList'
import gmaProfile  from './reducers/GmaProfile'
import accountKitInit  from './reducers/AccountKitInit'
import auth  from './reducers/Auth'
import thunk from 'redux-thunk'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/dist/js/bootstrap.js';
import './index.css'
import './tach.css'
import App from './App';

const middleware = [thunk]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore(
  combineReducers({
    gmasList,
    gmaProfile,
    accountKitInit,
    auth
  }),
  applyMiddleware(...middleware)
)

ReactDOM.render(
  <App store={store}/>,
  document.getElementById('root')
);
