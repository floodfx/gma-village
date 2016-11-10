import { combineReducers } from 'redux';
import gmasList from './GmasList'
import gmaProfile  from './GmaProfile'
// import client from '../graphql/client'


const rootReducer = combineReducers({
  gmasList,
  gmaProfile
})

export default rootReducer
