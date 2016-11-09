import { combineReducers } from 'redux';
import gmasList from './GmasList'
import gmaProfile  from './GmaProfile'


const rootReducer = combineReducers({
  gmasList,
  gmaProfile
})

export default rootReducer
