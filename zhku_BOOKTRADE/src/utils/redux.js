import { get, set } from '@utils/global_data'
import Taro from '@tarojs/taro'
import fetch from '@utils/request'

/**
 * 适当封闭 Redux, 简化调用
 * @param {Object} options 选项
 * @param {String} options.url 请求的地址
 * @param {String} options.payload 请求的数据 
 * @param {String} options.method 请求的类型
 * @param {Array} options.fetchOptions fetch选项
 * @param {String} options.cb
 * @param {String} options.type
 */

export function createAction(options) {
    const { url, payload={}, method, fetchOptions, cb, type } = options
    // const data = get('openId')
    const data = Taro.getStorageSync('openid')
    payload.openid = data || ''
    return dispatch => {
        return fetch({ url, payload, method, ...fetchOptions }).then(
             
            res => {
                let object = {
                    type,
                    payload: cb ? cb(res) : res
                }
                dispatch(object)
                return res
            }
        )
    }
}