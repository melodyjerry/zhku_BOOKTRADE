import Taro, { Component } from "@tarojs/taro"
import { View } from "@tarojs/components"
import { AtTabBar } from 'taro-ui'

import './index.scss'

const categoryNameArr = ['H', 'I', 'K', 'T', 'more']
export default class CategoryNavigate extends Component {

    constructor(props) {
        super(props)
    }

    state = {

    }


    handleClick = (value) => {
        Taro.navigateTo({url: `/pages/singleCategory/index?categoryType=${categoryNameArr[value]}`})
    }

    render() {

        return(
            <View className='container'>
                <AtTabBar
                  current={-1}
                  tabList={[
                    { title: '语言', image: 'https://www.shuaixiaoxiao.com/assets/tab-bar/语言.png', text: 'new' },
                    { title: '文学', image: 'https://www.shuaixiaoxiao.com/assets/tab-bar/文学.png', },
                    { title: '历史', image: 'https://www.shuaixiaoxiao.com/assets/tab-bar/历史.png', text: '23' },
                    { title: '技术', image: 'https://www.shuaixiaoxiao.com/assets/tab-bar/技术.png', text: '11' },
                    { title: '全部分类', image: 'https://www.shuaixiaoxiao.com/assets/tab-bar/更多.png', text: '42' }
                  ]}
                  onClick={this.handleClick.bind(this)}
                />
            </View>
        )
    }
}