import { combineReducers } from 'redux'
import counter from './counter'
import user from './user'
import test from './test'
import book from './book'
import category from './category'
import censor from './censor'
import comment from './comment'

export default combineReducers({
  counter,
  user,
  book,
  test,
  category,
  censor,
  comment
})
