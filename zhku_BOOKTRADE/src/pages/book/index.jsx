import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import * as actions from '@actions/book'
import { connect } from '@tarojs/redux'
import { BookInfo, BookComment } from '@components'

import { ButtomView } from './buttomView'
import './index.scss'

const baseClass = 'page'

@connect( state => state.book, { ...actions } )
class Book extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        bookInfo: {},
        bookComment: [],
        bookScore: {},
    }


    /**
     * 预加载，这个是要从别的页面跳转过来才会加载的
     * @param {*} params 
     */
    // componentWillPreload(params) {
    //     const { Id } = params
    //     const url = `${API_GET_MEMBER_INFO_BY_ID}?Id=${Id}`
    //     this.loadPackages({ Id })
    //     return fetch({ url })
    // }

    async componentWillMount() {
        const ISBN = '9787040403015'
        const payload = {
            isbn: ISBN
        }
        await this.props.dispatchLoadBookInfo(payload)
        await this.props.dispatchLoadBookComment(payload)
    }

    render() {
        const { bookInfo, bookComment, bookScore  } = this.props
        return(
            <View className={`${baseClass}`}>
                <View className={`${baseClass}-section`}>
                    <BookInfo 
                      data={bookInfo}
                    />
                </View>
                <View className={`${baseClass}-section`}>
                    评分图
                </View>
                <View className={`${baseClass}-section`}>
                    <BookComment 
                      data={bookComment}
                    />
                </View>
                <View className={`${baseClass}-end`}>--end--</View>
                <ButtomView 
                  originPrice={bookInfo.price}
                  currentPrice={bookInfo.price*0.6}
                  buttonValue='去购买'
                />
            </View>
        )
    }

}

Book.defaultProps = {
    bookInfo: {},
    bookComment: [],
    bookScore: {},
}

export default Book