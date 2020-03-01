import { combineReducers } from 'redux'
import counter from './counter'
import user from './user'
import test from './test'
import book from './book'

export default combineReducers({
  counter,
  user,
  book,
  test
})
