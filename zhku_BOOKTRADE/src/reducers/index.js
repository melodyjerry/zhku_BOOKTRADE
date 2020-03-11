import { combineReducers } from 'redux'
import counter from './counter'
import user from './user'
import test from './test'
import book from './book'
import category from './category'

export default combineReducers({
  counter,
  user,
  book,
  test,
  category
})
