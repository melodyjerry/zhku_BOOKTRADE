import Taro, { Component } from '@tarojs/taro'
import { View, Image, Label } from '@tarojs/components'
import { errorIcon } from '@constants/cloudIcon'

import './index.scss'

export default class NullData extends Component {
    render() {
        return(
            <View className='container'>
                <View className='container-view'>
                    <Image mode='widthFix' className='image' src={errorIcon} />
                    <Label className='data'>-暂无更多数据-</Label>
                </View>
            </View>
        )
    }
}