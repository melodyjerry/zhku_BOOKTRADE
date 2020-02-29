import Taro from '@tarojs/taro'

//设置错误码
// const CODE_SUCCESS = 200
// const CODE_AUTH_EXPIRED = 600
// const ERROR_MESSAGE = { //设置错误信息
//     600: '登录失效'
// }



/**
 * 封装fetch
 * @param options.url :请求url
 * @param options.method :请求方法
 * @param options.payload :请求参数
 * @param options.dataType :请求数据类型
 */
export default async function fetch(options) {
    const { url, method='GET', payload, dataType='json' } = options
    let header = {}   // 请求头
    if (method === 'POST') {
        header['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    if (typeof url !== 'string') {
        return Promise.reject({ message: 'url must be string', code: 101, param: url })
    }
    return Taro.request({
        url,
        method,
        data: payload,
        header,
        dataType: dataType
    })
}