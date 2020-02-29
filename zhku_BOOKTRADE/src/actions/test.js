import { createAction } from '@utils/redux'

/**
 * 赋予一个新数据
 */
export const dispatchNewInfo = () => ({ 
    type: 'testInfo',
    payload: 'newInfo',
})

/**
 * 前端修改state 
 */
export const dispatchAdd = payload => ({
    type: 'handleAdd',
    payload
})

