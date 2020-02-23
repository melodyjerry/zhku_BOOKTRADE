import Taro, { Component } from "@tarojs/taro"
import { View } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'

export default class Seach extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        return(
            <View>
                <AtSearchBar 
                  actionName='搜索'
                />
            </View>
        )
    }

}