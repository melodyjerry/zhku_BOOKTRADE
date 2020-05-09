import Taro, { Component, PureComponent } from "@tarojs/taro"
import { View } from "@tarojs/components"
import { AtTabBar } from 'taro-ui'

import './index.scss'

const categoryNameArr = ['H', 'I', 'K', 'T', 'more']
export default class CategoryNavigate extends PureComponent {

    constructor(props) {
        super(props)
    }

    state = {

    }

    allCategoryNum = (allCategoryInfo) => {
        let res = 0
        for (let i = 0; i < allCategoryInfo.length; i++) {
            res += Number(allCategoryInfo[i].category_num)
        }
        return res
    }


    handleClick = (value) => {
        if (value !== 4) return Taro.navigateTo({url: `/pages/singleCategory/index?categoryType=${categoryNameArr[value]}`})
        return Taro.navigateTo({ url: `/pages/allCategory/index?categoryType=${categoryNameArr[value]}&bookTypeIndex=${value}` })
    }

    render() {
        const { allCategoryInfo } = this.props
        let [num1, num2, num3, num4, num5] = ['...','...','...','...','...',]
        if (allCategoryInfo && allCategoryInfo.length !== 0) {
            num1 = allCategoryInfo[7].category_num
            num2 = allCategoryInfo[8].category_num
            num3 = allCategoryInfo[10].category_num
            num4 = allCategoryInfo[19].category_num
            num5 = this.allCategoryNum(allCategoryInfo)
        }
        return(
            <View className='container'>
                <AtTabBar
                  current={-1}
                  tabList={[
                    { title: '语言', image: 'https://www.shuaixiaoxiao.com/assets/tab-bar/语言.png', text: `${num1}` },
                    { title: '文学', image: 'https://www.shuaixiaoxiao.com/assets/tab-bar/文学.png', text: `${num2}` },
                    { title: '历史', image: 'https://www.shuaixiaoxiao.com/assets/tab-bar/历史.png', text: `${num3}` },
                    { title: '技术', image: 'https://www.shuaixiaoxiao.com/assets/tab-bar/技术.png', text: `${num4}` },
                    { title: '全部分类', image: 'https://www.shuaixiaoxiao.com/assets/tab-bar/更多.png', text: `${num5}` }
                  ]}
                  onClick={this.handleClick.bind(this)}
                />
            </View>
        )
    }
}