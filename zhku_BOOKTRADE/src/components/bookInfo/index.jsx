import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'

import './index.scss'

const baseClass = 'component'

export default class BookInfo extends Component {

    constructor(props) {
        super(props)
    }

    defaultProps = {
        data: {},
        showQuantity: false
    }

    render () {
        const { data, showQuantity } = this.props
        return(
            <View className={`${baseClass}`}>
                <View className={`${baseClass}-imageView`}>
                    <Image 
                      className={`${baseClass}-imageView-image`} 
                      src={data.pic} 
                      mode='widthFix'
                    />
                    <View className={`${baseClass}-imageView-font`}>{data.title}</View>
                </View>
                <View className={`${baseClass}-info`}>
                    <View className={`${baseClass}-info-row`}>
                        <View className={`${baseClass}-info-row-span`}>作者</View>
                        <View className={`${baseClass}-info-row-value`}>{data.author}</View>
                        <View className={`${baseClass}-info-row-browse`}>浏览量:{data.fever}</View>
                    </View>
                    <View className={`${baseClass}-info-row`}>
                        <View className={`${baseClass}-info-row-span`}>出版社</View>
                        <View className={`${baseClass}-info-row-value`}>{data.publisher}</View>
                    </View>
                    <View className={`${baseClass}-info-row`}>
                        <View className={`${baseClass}-info-row-span`}>ISBN</View>
                        <View className={`${baseClass}-info-row-value`}>{data.isbn}</View>
                    </View>
                    <View className={`${baseClass}-info-row`}>
                        <View className={`${baseClass}-info-row-span`}>定价</View>
                        <View className={`${baseClass}-info-row-value`}>{data.price}</View>
                    </View>
                    {showQuantity && 
                        <View className={`${baseClass}-info-row`}>
                            <View className={`${baseClass}-info-row-span`}>库存</View>
                            <View className={`${baseClass}-info-row-value`}>{data.book_quantity || 0}</View>
                        </View>
                    }
                </View>
            </View>
        )
    }

}