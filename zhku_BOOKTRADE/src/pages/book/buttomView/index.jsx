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
        const { originPrice, currentPrice, type } = this.props
        let bool = type === 'show' ? true : false
        let buttonValue = type === 'show' ? '只能通过扫码交易' : ( type === 'get' ? '取书' : '捐书')
        return(
            <View className={`${baseClass}`}>
                <View className={`${baseClass}-price`}>
                    <View className={`${baseClass}-price-current`}>{ type ==='get' ? '所需积分' : '返回积分'} : {currentPrice}</View>
                    <View className={`${baseClass}-price-origin`}>定价{originPrice}</View>
                </View>
                <View className={`${baseClass}-button`}>
                    <View className={`${baseClass}-button-value`}>
                        <AtButton disabled={bool} type='primary'>{buttonValue}</AtButton>
                    </View>
                </View>
            </View>
        )
    }
}