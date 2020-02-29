import { LOGIN, LOGOUT } from '@constants/user'


const INITIAL_STATE = {
    isLogin: false,
}

export default function test(state = INITIAL_STATE, action) {
    switch(action.type) {
        case LOGIN: {
            return {
                ...state,
                isLogin: true,
            }
        }
        case LOGOUT: {
            return {
                ...state,
                isLogin: false,
            }
        }
        default: 
            return state
    }
}