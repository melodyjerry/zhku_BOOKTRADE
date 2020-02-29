import { combineReducers } from 'redux'
import counter from './counter'
import user from './user'
import test from './test'

export default combineReducers({
  counter,
  user,
  test
})
