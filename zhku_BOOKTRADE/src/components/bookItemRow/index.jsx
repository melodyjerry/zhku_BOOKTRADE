import Taro, { Component } from "@tarojs/taro"
import { View } from '@tarojs/components'
import './index.scss'

const baseClass = 'component'
export default class BookItemRow extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        
    }

    render() {
        const { pic, book_name, author, price } = this.props
        return(
            <View className={baseClass}>
                <Image 
                  className={`${baseClass}-image`} 
                  src={pic}
                  mode='widthFix'
                ></Image>
                <View className={`${baseClass}-info`}>
                    <View className={`${baseClass}-info-name`}>{book_name}</View>
                    <View className={`${baseClass}-info-author`}>{author}</View>
                    <View className={`${baseClass}-info-price`}>原价:￥{price}</View>
                </View>
            </View>
        )
    }
}