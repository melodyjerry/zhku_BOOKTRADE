import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import * as actions from '@actions/book'
import { connect } from '@tarojs/redux'
import { AtAccordion } from 'taro-ui'
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
        type: '',
        currentPrice: 0,
        originPrice: 0,
        descOpen: false,
    }


    /**
     * 预加载，这个是要从别的页面跳转过来才会加载的
     * @param {*} params 
     */
    async componentWillPreload(params) {
        const { isbn, type='show' } = params
        const payload = { isbn }
        await this.props.dispatchLoadBookInfo(payload)
        await this.props.dispatchLoadBookComment(payload)
        this.setState({
            type: type,
        })
    }

    async componentWillMount() {
        const { bookInfo } = this.props
        const { type } = this.state
        this.setState({
            currentPrice: parseInt(bookInfo.price*( type === 'get' ? 0.7 : 0.6 )),
            originPrice: bookInfo.price,
        })
    }

    setValue (value) {
        this.setState({
            descOpen: value
        })
    }

    /**
     * 捐书/取书按钮
     */
    submit () {

    }

    render() {
        const { bookInfo, bookComment, bookScore } = this.props
        const { currentPrice, originPrice, type } = this.state
        return(
            <View className={`${baseClass}`}>
                <View className={`${baseClass}-section`}>
                    <BookInfo 
                      data={bookInfo}
                    />
                </View>
                {/* <View className={`${baseClass}-section`}>
                </View> */}
                <View className={`${baseClass}-section`}>
                    <AtAccordion
                      open={this.state.descOpen}
                      onClick={ this.setValue.bind(this) }
                      title='书籍简介'
                    >
                        <View className={`${baseClass}-section-summary`}>
                            { bookInfo.summary }
                        </View>
                    </AtAccordion>
                </View>
                <View className={`${baseClass}-section`}>
                    <BookComment 
                      data={bookComment}
                    />
                </View>
                <View className={`${baseClass}-end`}>--end--</View>
                <ButtomView 
                    submit={this.submit.bind(this)}
                    originPrice={originPrice}
                    currentPrice={currentPrice}
                    type={type}
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