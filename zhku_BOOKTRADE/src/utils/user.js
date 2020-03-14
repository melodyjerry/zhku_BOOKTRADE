import Taro from '@tarojs/taro'
import fetch from '@utils/request'
import { API_GET_USER_POINT, API_GET_USER_OPENID } from '@constants/api'

/**
 * 获取openid
 */
export async function getUserOpenId () {
    const loginInfo = await Taro.login()
    const { code, errMsg } = loginInfo
    if (errMsg !== 'login:ok') throw new Error(errMsg)
    
    const params = {}
    params.payload = { code }
    params.url = API_GET_USER_OPENID
    const response = await fetch(params)
    return response
}

/**
 * 获取userinfo
 */
export async function getUserInfo () {
    try {
        const scope = await Taro.getSetting()  //获得权限
        const { authSetting } = scope

        // 没有授权则去授权
        let msg = {}
        if (!authSetting["scope.userInfo"]) { msg = await Taro.authorize({scope: 'scope.userInfo'}) }
        if (msg.errMsg !== 'authorize:ok' && !authSetting["scope.userInfo"]) return
        const { code } = await Taro.login()
        const userInfo = await Taro.getUserInfo()

        return { ...userInfo, code }
    } catch (error) {
        throw error
    }
}


export async function getUserPoint() {
    try {
        const openid = Taro.getStorageSync('openId')
        const request = {}
        request.payload = { openid }
        request.url = API_GET_USER_POINT 
        const response = await fetch(request)
        return response
    } catch (err) {
        throw err
    }
}