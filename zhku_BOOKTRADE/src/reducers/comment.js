import {
    GETBECOMMENTEDBOOK
} from '@constants/comment'

const INITIAL_STATE ={
    beCommentedBook: [],
}

export default function comment(state = INITIAL_STATE, action) { 
    switch (action.type) {
        case GETBECOMMENTEDBOOK: 
            return {
                ...state,
                beCommentedBook: action.payload.data.ret === 0 ? action.payload.data.userLog : [],
            }
        default:
            return state

    }
}