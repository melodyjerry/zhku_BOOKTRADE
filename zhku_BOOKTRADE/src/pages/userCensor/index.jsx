import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { CensorItem } from '@components/'
import * as actions from '@actions/censor'
import { connect } from '@tarojs/redux'
import { AtTabBar, AtTabs, AtTabsPane } from 'taro-ui'

const baseClass = 'page'

@connect( state => state.censor, { ...actions } )
class UserCensor extends Component {

    constructor(props) {
        super(props)
    }


    /**
     * 预加载，这个是要从别的页面跳转过来才会加载的
     * @param {*} params 
     */
    // async componentWillPreload(params) {
    //     const { type } = params
    //     const { dispatchLoadUserCensor, selfCensorList } = this.props
    //     await dispatchLoadUserCensor()
    //     console.log(selfCensorList);
    //     this.setState({ currentTab: type })
    // }

    defaultProps = {
        selfCensorListUnaudited: [],
        selfCensorListPass: [],
        selfCensorListFail: [],
    }

    componentDidMount = async () => {
        const { type } = this.$router.params
        const { dispatchLoadUserCensor } = this.props
        await dispatchLoadUserCensor()
        this.setState({ currentTab: type })
    }

    config = {
        navigationBarTitleText: 'USERCENSOR'
    }

    state = {
        currentTab: 0,
    }

    handleTabClick = (value) => {
        this.setState({
            currentTab: value
        })
    }

    render() {
        const { currentTab } = this.state
        const { selfCensorListUnaudited, selfCensorListPass, selfCensorListFail } = this.props
        return(
            <View className={`${baseClass}`}>
                <AtTabBar
                    tabList={[
                        { title: `待审核(${selfCensorListUnaudited.length})` },
                        { title: `审核通过(${selfCensorListPass.length})` },
                        { title: `审核失败(${selfCensorListFail.length})` }
                    ]}
                    onClick={this.handleTabClick.bind(this)}
                    current={currentTab}
                />
                <AtTabs 
                    current={currentTab} 
                    tabList={[]} 
                    onClick={this.handleTabClick.bind(this)}
                >
                    <AtTabsPane current={currentTab} index={0} >
                        {(Object.keys(selfCensorListUnaudited)).length !== 0 && selfCensorListUnaudited.map((value, index) => {
                            const { Censor_id, add_time, pic, title, price, state } = value
                                return(
                                    <CensorItem
                                        Censor_id={Censor_id}
                                        price={price}
                                        add_time={add_time}
                                        pic={pic}
                                        title={title}
                                        censor={false}
                                        beEvaluated={false}
                                        state={state}
                                    />
                                )
                        })}
                    </AtTabsPane>
                    <AtTabsPane current={currentTab} index={1}>
                        {(Object.keys(selfCensorListPass)).length !== 0 && selfCensorListPass.map((value, index) => {
                            const { Censor_id, add_time, pic, title, price, state } = value
                                return(
                                    <CensorItem
                                        Censor_id={Censor_id}
                                        price={price}
                                        add_time={add_time}
                                        pic={pic}
                                        title={title}
                                        censor={false}
                                        beEvaluated={false}
                                        state={state}
                                    />
                                )
                        })}
                    </AtTabsPane>
                    <AtTabsPane current={currentTab} index={2}>
                        {(Object.keys(selfCensorListFail)).length !== 0 && selfCensorListFail.map((value, index) => {
                            const { Censor_id, add_time, pic, title, price, state } = value
                                return(
                                    <CensorItem
                                        Censor_id={Censor_id}
                                        price={price}
                                        add_time={add_time}
                                        pic={pic}
                                        title={title}
                                        censor={false}
                                        beEvaluated={false}
                                        state={state}
                                    />
                                )
                        })}
                    </AtTabsPane>
                </AtTabs>
            </View>
        )
    }

}

export default UserCensor