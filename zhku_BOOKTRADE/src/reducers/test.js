const INITIAL_STATE = {
    testInfo: {name: 'zhx'},
    number: 1,
}

export default function test(state = INITIAL_STATE, action) {
    switch(action.type) {
        case 'testInfo': {
            return {
                ...state,
                itemInfo: action.payload
            }
        }
        case 'handleAdd': {
            return { 
                ...state,
                number: state.number+1,
            }
        }
        default:
            return state
  }
}
