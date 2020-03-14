import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import * as actions from '@actions/book'
import { connect } from '@tarojs/redux'
import { AtAccordion } from 'taro-ui'
import { BookInfo, BookComment } from '@components'
import { API_ADD_CENSOR, API_USER_TAKE_BOOK } from '@constants/api'
import fetch from '@utils/request'
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


    async componentDidMount() {
        const { isbn, type='show' } = this.$router.params
        const payload = { isbn }
        await this.props.dispatchLoadBookInfo(payload)
        await this.props.dispatchLoadBookComment(payload)
        const { bookInfo } = this.props
        this.setState({
            type: type,
            currentPrice: parseInt(bookInfo.price*( type === 'get' ? 0.7 : 0.6 )),
            originPrice: bookInfo.price,
        })
    }

    config = {
        navigationBarTitleText: 'BOOK'
    }


    setValue (value) {
        this.setState({
            descOpen: value
        })
    }

    /**
     * 捐书/取书按钮
     */
    submit = async () => {
        const { bookInfo } = this.props
        const { currentPrice } = this.state
        const openid = Taro.getStorageSync('openId')
        const payload = { isbn: bookInfo.isbn, title: bookInfo.title, credit: currentPrice, openid: openid }
        const request = { 
            url: type === 'sub' ? API_ADD_CENSOR : API_USER_TAKE_BOOK,
            payload: payload 
        }
        try {
            const response = await fetch(request)
            if (response.data.ret === 0) {
                Taro.showToast({ title: type === 'sub' ? '捐书成功' : '取书成功', icon: 'success' })
                setTimeout(() => {
                    Taro.navigateBack()
                }, 1000)
            }
        } catch (err) {
            Taro.showToast({ title: err, icon: 'none' })
        }
    }

    render() {
        const { bookInfo, bookComment } = this.props
        const { currentPrice, originPrice, type } = this.state
        return(
            <View className={`${baseClass}`}>
                <View className={`${baseClass}-section`}>
                    <BookInfo 
                      data={bookInfo}
                      showQuantity={true}
                    />
                </View>
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
                    onSubmit={this.submit}
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