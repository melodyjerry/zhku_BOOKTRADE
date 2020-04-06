import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'

import './index.scss'

const baseClass = 'component'

export default class ButtomView extends Component {

    constructor(props) {
        super(props)
    }

    async handleSubmit() {
        const { onSubmit } = this.props

        const templateId = 'mql0Za2edVS2eYkdKNM--AcxI16KZwSbEKxsEV40-ag'
        const response = await Taro.requestSubscribeMessage({ tmplIds: [templateId] })
        if (response.errMsg !== 'requestSubscribeMessage:ok') {
            Taro.showToast({ title: '您需要订阅消息才能交易哦', icon: 'none' })
            return
        }
        onSubmit && onSubmit(templateId)
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
                        <AtButton 
                            disabled={bool} 
                            type='primary'
                            onClick={this.handleSubmit.bind(this)}
                        >{buttonValue}</AtButton>
                    </View>
                </View>
            </View>
        )
    }
}