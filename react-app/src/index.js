import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import { reducer as formReducer } from 'redux-form'

// reducers
import adminList from './reducers/AdminList'
import adminProfile  from './reducers/AdminProfile'
import saveAdmin  from './reducers/SaveAdmin'

import gmasList from './reducers/GmasList'
import gmaProfile  from './reducers/GmaProfile'
import saveGma  from './reducers/SaveGma'

import saveParent  from './reducers/SaveParent'
import parentProfile  from './reducers/ParentProfile'
import parentList  from './reducers/ParentList'

import saveCareNeed  from './reducers/SaveCareNeed'

import accountKitInit  from './reducers/AccountKitInit'
import auth  from './reducers/Auth'
import uploadImage  from './reducers/UploadImage'

import AuthListener  from './auth/AuthListener'

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
    adminList,
    adminProfile,
    saveAdmin,
    gmasList,
    gmaProfile,    
    saveGma,
    saveParent,
    parentProfile,
    parentList,
    saveCareNeed,
    accountKitInit,
    auth,
    uploadImage,
    form: formReducer
  }),
  applyMiddleware(...middleware)
)

let authListener = new AuthListener(store)

store.subscribe(authListener.listen);

ReactDOM.render(
  <App store={store} authListener={authListener}/>,
  document.getElementById('root')
);
