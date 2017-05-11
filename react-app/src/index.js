import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import { reducer as formReducer } from 'redux-form'
import AuthListener  from './auth/AuthListener'
import thunk from 'redux-thunk'
import reducers from './reducers';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/dist/js/bootstrap.js';
import './index.css'
import './tach.css'
import App from './App';

const sagaMiddleware = createSagaMiddleware()

const middleware = [thunk, sagaMiddleware]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore(
  reducers,
  applyMiddleware(...middleware)
)

sagaMiddleware.run(sagas)

let authListener = new AuthListener(store)

store.subscribe(authListener.listen);

ReactDOM.render(
  <App store={store} authListener={authListener}/>,
  document.getElementById('root')
);
