import Taro, { Component } from "@tarojs/taro"
import { View } from '@tarojs/components'
import { 
    CategoryNavigate,
    showTypeOne,
} from '@components'
import { AtSearchBar } from 'taro-ui'

import './index.scss'

const baseClass = 'page'

export default class Home extends Component {

    
    
    constructor(props) {
        super(props)
        
    }
    
    state = {
        seachValue: '',
    }
    
    config = {}

    /**
     * 搜索框内容change
     * @param {*} value 
     */
    seachValueOnChange (value) {
        this.setState({
            seachValue: value
        })
    }

    /**
     * 搜索按钮点击事件，跳转到搜索页面
     */
    seachOnActionClick () {
        Taro.navigateTo({url: `/pages/seach/index?seachValue=${this.state.seachValue}`})
    }

    render() {
        return(
            <View className={baseClass}>
                <AtSearchBar
                  className={`${baseClass}-seachContainer`}
                  fixed
                  value={this.state.seachValue}
                  onChange={this.seachValueOnChange.bind(this)}
                  onActionClick={this.seachOnActionClick.bind(this)}
                />
                <View className={`${baseClass}-container`}>
                    <CategoryNavigate
                      className={`${baseClass}-container-section`}
                    />
                    <showTypeOne 
                      className={`${baseClass}-container-section`}
                    />
                    <showTypeOne 
                      className={`${baseClass}-container-section`}
                    />
                    {/* <View>热门书籍(showTypeOne)</View> */}
                    {/* <View>最近发布(showTypeOne)</View> */}
                </View>
            </View>
        )
    }
}