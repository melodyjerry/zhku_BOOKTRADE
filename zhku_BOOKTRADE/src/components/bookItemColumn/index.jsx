import Taro, { Component, PureComponent } from "@tarojs/taro"
import { View, Image, Label } from '@tarojs/components'
import { Loading } from '@components/'
import { errURL } from '@utils/global_data'
import './index.scss'

const baseClass = 'component'
export default class BookItemColumn extends PureComponent {

    constructor(props) {
        super(props)
    }

    state = {
        Pic: '', 
        Book_name: '', 
        Book_quantity: '', 
        Price: '', 
        Isbn: '', 
    }

    componentDidMount() {
        const { pic, book_name, book_quantity, price, isbn, seachKey } = this.props
        this.setState({ Pic: pic, Book_name: book_name, Book_quantity: book_quantity, Price: price, Isbn: isbn })
    }

    onClick(isbn) {
        Taro.navigateTo({ url: `/pages/book/index?isbn=${isbn}&type=show` })
    }

    render() {
        const { seachKey } = this.props
        const { Pic, Book_name, Book_quantity, Price, Isbn } = this.state
        let [bool, firstStr, secondStr ] = [ false, '', '' ]
        if (seachKey) {
            const ind = Book_name.search(seachKey)
            firstStr = Book_name.slice(0, ind)
            secondStr = Book_name.slice(ind+seachKey.length, Book_name.length)
            bool = true
        }
        return(
            <View 
              className={baseClass}
              onClick={this.onClick.bind(this, Isbn)}
            >   
                {Pic && 
                    <Image className={`${baseClass}-image`} src={Pic || errURL} mode='widthFix' />
                }
                <View className={`${baseClass}-info`}>
                    <View className={`${baseClass}-info-bold`}>
                        {!bool ? 
                            <Label>{Book_name}</Label> 
                        : 
                            <Label>
                                <Label>{firstStr}</Label>
                                <Label className='red'>{seachKey}</Label>
                                <Label>{secondStr}</Label>
                            </Label>
                        }
                    </View>
                    <View className={`${baseClass}-info-grey`}>价格：{Price}</View>
                    <View className={`${baseClass}-info-grey`}>库存：{Book_quantity || 0}</View>
                </View>
            </View>
        )
    }
}