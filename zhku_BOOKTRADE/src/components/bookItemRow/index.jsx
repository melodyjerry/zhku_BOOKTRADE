import Taro, { Component } from "@tarojs/taro"
import { View, Image } from '@tarojs/components'
import './index.scss'

const baseClass = 'component'
export default class BookItemRow extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        
    }

    onClick(isbn) {
        Taro.navigateTo({ url: `/pages/book/index?isbn=${isbn}&type=show` })
    }

    render() {
        const { pic, book_name, author, price, isbn, fever } = this.props
        return(
            
            <View 
              className={baseClass} 
              onClick={this.onClick.bind(this, isbn)}
            >
                <Image 
                  className={`${baseClass}-image`} 
                  src={pic}
                  mode='widthFix'
                ></Image>
                <View className={`${baseClass}-info`}>
                    <View className={`${baseClass}-info-name`}>{book_name}</View>
                    <View className={`${baseClass}-info-author`}>{author}</View>
                    <View className={`${baseClass}-info-price`}>原价:￥{price}</View>
                    <View className={`${baseClass}-info-browse`}>
                        <View className='at-icon at-icon-eye'></View>
                        {fever}
                    </View>
                </View>
            </View>
        )
    }
}