import { LOGIN, LOGOUT } from '@constants/user'


/**
 * 登入
 */
export const dispatchLogIn = () => ({
    type: LOGIN
})

export const dispatchLogOut = () => ({
    type: LOGOUT,
})