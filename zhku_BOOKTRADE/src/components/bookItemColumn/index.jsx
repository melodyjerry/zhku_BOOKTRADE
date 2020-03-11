import Taro, { Component } from "@tarojs/taro"
import { View, Image } from '@tarojs/components'
import './index.scss'

const baseClass = 'component'
export default class BookItemColumn extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        
    }

    onClick(isbn) {
        Taro.navigateTo({ url: `/pages/book/index?isbn=${isbn}&type=show` })
    }

    render() {
        const { pic, book_name, book_quantity, price, isbn } = this.props
        return(
            <View 
              className={baseClass}
              onClick={this.onClick.bind(this, isbn)}
            >
                <Image className={`${baseClass}-image`} src={pic} mode='widthFix' />
                <View className={`${baseClass}-info`}>
                    <View className={`${baseClass}-info-bold`}>{book_name}</View>
                    <View className={`${baseClass}-info-grey`}>价格：{price}</View>
                    <View className={`${baseClass}-info-grey`}>库存：{book_quantity}</View>
                </View>
            </View>
        )
    }
}