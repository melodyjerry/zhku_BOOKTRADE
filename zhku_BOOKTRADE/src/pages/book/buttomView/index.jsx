import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'

import './index.scss'

const baseClass = 'component'

export default class ButtomView extends Component {

    constructor(props) {
        super(props)
    }

    render () {
        const { originPrice, currentPrice, buttonValue } = this.props
        return(
            <View className={`${baseClass}`}>
                <View className={`${baseClass}-price`}>
                    <View className={`${baseClass}-price-current`}>￥{currentPrice}</View>
                    <View className={`${baseClass}-price-origin`}>定价{originPrice}</View>
                </View>
                <View className={`${baseClass}-button`}>
                    <View className={`${baseClass}-button-value`}>
                        <AtButton type='primary'>{buttonValue}</AtButton>
                    </View>
                </View>
            </View>
        )
    }
}