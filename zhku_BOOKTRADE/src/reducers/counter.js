import { ADD, MINUS } from '@constants/counter'

const INITIAL_STATE = {
  num: 0
}

export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD:
      console.log('加')
      return {
        ...state,
        num: state.num + 1
      }
    case MINUS:
      console.log('减')
      return {
        ...state,
        num: state.num - 1
      }
    default:
      return state
  }
}
