import Taro from '@tarojs/taro'
import fetch from '@utils/request'

/**
 * 获取openid
 */
export async function getUserOpenId () {
    const loginInfo = await Taro.login()
    const { code, errMsg } = loginInfo
    if (errMsg !== 'login:ok') throw new Error(errMsg)
    
    const params = {}
    params.payload = { code }
    params.url = 'https://www.shuaixiaoxiao.com/wechat-return/UserInteract/wx_openid.php'
    const response = await fetch(params)
    return response
}

/**
 * 获取userinfo
 */
export async function getUserInfo () {
    try {
        const $scope = await Taro.getSetting()  //获得权限
        const { authSetting } = $scope

        // 没有授权则去授权
        if (!authSetting["scope.userInfo"]) await Taro.authorize({scope: 'scope.userInfo'})
        
        const { code } = await Taro.login()
        const userInfo = await Taro.getUserInfo()

        return { ...userInfo, code }
    } catch (error) {
        throw error
    }
}

export async function getUserPoint() {
    try {
        const storage = await Taro.getStorage({ key: 'openId' })
        const openId = storage.data.openid
        const params = {}
        params.payload = { openid: openId }
        params.url = 'https://www.shuaixiaoxiao.com/wechat-return/UserInteract/personal_getPoint.php' 
        const response = await fetch(params)
        return response
    } catch (err) {
        throw err
    }
}