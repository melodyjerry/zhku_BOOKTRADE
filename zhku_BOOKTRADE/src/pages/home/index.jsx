import Taro, { Component } from "@tarojs/taro"
import { View } from '@tarojs/components'


export default class Home extends Component {

    
    
    constructor(props) {
        super(props)
        
    }
    
    state = {}
    
    config = {}

    render() {
        return(
            <View>
                <View>搜索组件</View>
                <View>分类组件</View>
                <View>热门书籍(showTypeOne)</View>
                <View>最近发布(showTypeOne)</View>
            </View>
        )
    }
}