import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import gmasList from './reducers/GmasList'
import gmaProfile  from './reducers/GmaProfile'
import App from './App';
import thunk from 'redux-thunk'

import './index.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


const middleware = [thunk]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore(
  combineReducers({
    gmasList,
    gmaProfile
  }),
  applyMiddleware(...middleware)
)

ReactDOM.render(
  <App store={store}/>,
  document.getElementById('root')
);
