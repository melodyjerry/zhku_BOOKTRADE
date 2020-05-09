import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem } from '@tarojs/components'
import * as actions from '@actions/book'
import { connect } from '@tarojs/redux'
import { AtAccordion } from 'taro-ui'
import { get } from '@utils/global_data'
import { BookInfo, BookComment, ShowTypeOne, BookItemRow } from '@components'
import { 
    API_ADD_CENSOR, 
    API_USER_TAKE_BOOK, 
    API_GET_BOOKS_INFO_BY_ISBN 
} from '@constants/api'
import { shortid } from '@utils/methods'
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
        commentBooksInfo: [],
        type: '',
        currentPrice: 0,
        originPrice: 0,
        descOpen: false,
    }


    componentDidShow = async () => {
        const { isbn, type='show' } = this.$router.params
        let { commentBooksInfo } = this.state
        let payload = {}
        if (get('openId')) {
            payload = { isbn, openid: get('openId') }
        } else {
            payload = { isbn }
        }
        await this.props.dispatchLoadBookInfo(payload)
        await this.props.dispatchLoadBookComment(payload)
        const { bookInfo, commentBookList } = this.props
        // 有推荐的书
        if (commentBookList && commentBookList.length !== 0) {
            commentBooksInfo = await this.loadRecommendBooks({ commentBookList })
        }
        this.setState({
            commentBooksInfo,
            type: type,
            currentPrice: parseInt(bookInfo.price*( type === 'get' ? 0.7 : 0.6 )),
            originPrice: bookInfo.price,
        })
    }

    loadRecommendBooks = async (params) => {
        const { commentBookList } = params
        let isbn_arr_str = ''
        for (let index = 0; index < commentBookList.length; index++) {
            if (index !== 0) {
                isbn_arr_str += ','
            }
            isbn_arr_str += commentBookList[index][0]
            if (index > 2) break
        }
        const request = {
            url: API_GET_BOOKS_INFO_BY_ISBN,
            payload: {
                isbn_arr: isbn_arr_str
            }
        }
        try {
            const response = await fetch(request)
            return response.data.recommendBooksInfo
        } catch (err) { 
            console.log(err) 
            return ''
        }
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
    submit = async (templateId) => {
        Taro.showLoading({ title: '操作中' })
        const { bookInfo } = this.props
        const { currentPrice, type } = this.state
        const openid = Taro.getStorageSync('openId')
        const payload = { 
            isbn: bookInfo.isbn, 
            title: bookInfo.title, 
            credit: currentPrice, 
            openid: openid, 
            templateId: templateId 
        }
        const request = { 
            url: type === 'sub' ? API_ADD_CENSOR : API_USER_TAKE_BOOK,
            payload: payload 
        }
        try {
            const response = await fetch(request)
            Taro.hideLoading()
            if (response.data.ret === 0) {
                Taro.showToast({ title: type === 'sub' ? '捐书成功' : '取书成功', icon: 'success' })
                setTimeout(() => {
                    Taro.navigateBack()
                }, 1000)
            }
        } catch (err) {
            Taro.hideLoading()
            Taro.showToast({ title: err+'，请重试', icon: 'none' })
        }
    }

    render() {
        const { bookInfo, bookComment } = this.props
        const { currentPrice, originPrice, type, commentBooksInfo } = this.state
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
                {commentBooksInfo.length !== 0 ? 
                    <View className={`${baseClass}-section`}>
                        <ShowTypeOne
                            // extra='换一批'
                            title='推荐书籍'
                            // handler={this.handlerClickRefreshHot}
                        >
                            <Swiper
                            className='test-h'
                            indicatorColor='#999'
                            displayMultipleItems={3}
                            indicatorDots
                            >
                                {commentBooksInfo.map((value, index) => {
                                    const { pic, book_name, author, price, isbn, fever } = value
                                    return(
                                        <SwiperItem key={shortid(index)}>
                                            <BookItemRow
                                            fever={fever}
                                            isbn={isbn}
                                            pic={pic}
                                            book_name={book_name}
                                            author={author}
                                            price={price}
                                            />
                                        </SwiperItem>
                                    )
                                })}
                            </Swiper>
                        </ShowTypeOne>
                    </View>
                    : null}   
                <View className={`${baseClass}-end`}>--end--</View>
                <ButtomView 
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