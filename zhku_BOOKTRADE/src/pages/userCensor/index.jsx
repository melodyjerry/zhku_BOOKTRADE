import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
// import * as actions from '@actions/censor'
import { connect } from '@tarojs/redux'

const baseClass = 'page'

// @connect( state => state.book, { ...actions } )
class UserCensor extends Component {

    constructor(props) {
        super(props)
    }


    /**
     * 预加载，这个是要从别的页面跳转过来才会加载的
     * @param {*} params 
     */
    // componentWillPreload(params) {
    //     const { Id } = params
    //     const url = `${API_GET_MEMBER_INFO_BY_ID}?Id=${Id}`
    //     this.loadPackages({ Id })
    //     return fetch({ url })
    // }


    state = {

    }

    render() {
        return(
            <View className={`${baseClass}`}>
                用户审核
            </View>
        )
    }

}

export default UserCensor