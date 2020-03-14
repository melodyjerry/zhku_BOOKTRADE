import Taro, { Component } from "@tarojs/taro"
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { censorArr, serverArr } from '@constants/user'
import { AtCard, AtAvatar, AtGrid, AtToast } from 'taro-ui'
import { superUser } from '@constants/superUser'
import * as actions from '@actions/user'
import { get, set } from '@utils/global_data'
import { getUserOpenId, getUserInfo, getUserPoint } from '@utils/user'

import './index.scss'

const baseClass = 'page'

@connect(state => state.user, { ...actions })
class User extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        nickName: '',
        avatarUrl: '',
        credit: '--',
        loadingOpen: false,
    }

    componentDidMount() {
        this.applyData()
    }

    componentDidShow = async () => {}

    /**
     * props修改触发
     * @param {*} nextProps ：下一个props
     */
    componentWillReceiveProps(nextProps) {
        // console.log(this.props, nextProps)
    }

    config = {
        navigationBarTitleText: 'USER'
    }


    /**
     * 重新渲染整个页面的数据
     */
    applyData = async () => {
        // 获得缓存数据并处理
        let state = {}
        if (this.props.isLogin) {
            const storageUserInfo = await Taro.getStorage({ key: 'userInfo'})
            const storageCredit = await getUserPoint()
            const { nickName, avatarUrl } = storageUserInfo.data.userInfo
            const { credit } = storageCredit.data
            state.nickName = nickName
            state.avatarUrl = avatarUrl
            state.credit = credit
        } else {
            state.nickName = '未登录'
            state.avatarUrl = '',
            state.credit = '--'
        }
        this.setState(state)
    }

    /**
     * 登录/注册则修改登录状态为true，并且缓存openId和userInfo
     */
    logIn = async () => {
        const { dispatchLogIn } = this.props
        const storage = await getUserOpenId()
        const userInfo = await getUserInfo()
        dispatchLogIn()                          // 修改登录状态
        set('openId', storage.data.openid)
        superUser.map((value, index) => {
            if (value === storage.data.openid) {
                set('isSuperUser', true)
            }
        })
        set('userInfo', userInfo)
        Taro.setStorageSync('openId', storage.data.openid)
        Taro.setStorageSync('userInfo', userInfo)
        this.applyData()  // 渲染数据
    }

    /**
     * 登出
     */
    logOut = async () => {
        const { dispatchLogOut } = this.props
        dispatchLogOut()       // 修改登录状态
        Taro.clearStorage()    // 清空缓存
        this.applyData()  // 渲染数据
    }

    /**
     * 跳转到用户审核页面，待评价
     */
    handleCensorClick = (item, index) => {
        if (!this.props.isLogin) { this.logIn() }
        if (index === 3) return Taro.navigateTo({ url: '/pages/beCommentList/index' })
        Taro.navigateTo({
            url: `/pages/userCensor/index?type=${index}`
        })
    }

    /**
     * 跳转到我的服务页面
     */
    handleServerClick = (item, index) => {

    }


    render() {
        const { isLogin } = this.props
        const { nickName, avatarUrl, loadingOpen } = this.state
        
        return(
            <View className={baseClass}>
                <AtToast isOpened={loadingOpen} text="正在加载..." status='loading' icon="{icon}"></AtToast>
                <View className={`${baseClass}-userInfo`}>
                    <View className={`${baseClass}-userInfo-avatar`}>
                        <AtAvatar 
                          size='large'
                          image={avatarUrl}
                          text={nickName}
                        />
                        <View>{nickName}</View>
                    </View>
                    <View className={`${baseClass}-userInfo-action`}>
                        {!isLogin ? 
                        <View onClick={this.logIn}>登录/注册</View> : 
                        <View onClick={this.logOut}>登出</View>}
                    </View>
                </View>
                <View className={`${baseClass}-userAssets`}>
                    <AtCard title='我的资源'>
                        <View className={`${baseClass}-userAssets-row`}>
                            <View className={`${baseClass}-userAssets-row-left`}>剩余积分</View>
                            <View className={`${baseClass}-userAssets-row-right`}>{this.state.credit}</View>
                        </View>
                    </AtCard>
                </View>
                <View className={`${baseClass}-censor`}>
                    <AtCard title='我的发布'>
                        <AtGrid 
                          hasBorder={false}
                          data={censorArr}
                          columnNum={4}
                          onClick={this.handleCensorClick}
                        />
                    </AtCard>
                </View>
                <View className={`${baseClass}-server`}>
                    <AtCard title='我的服务'>
                        <AtGrid 
                          hasBorder={false}
                          data={serverArr}
                          columnNum={4}
                          onClick={this.handleServerClick}
                        />
                    </AtCard>
                </View>
                
            </View>
        )
    }

}

export default User