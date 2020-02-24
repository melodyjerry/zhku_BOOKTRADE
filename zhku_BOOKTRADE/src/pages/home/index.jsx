import Taro, { Component } from "@tarojs/taro"
import { 
    View,
    Swiper, 
    SwiperItem
} from '@tarojs/components'
import fetch from '@utils/request'
import { 
    CategoryNavigate,
    ShowTypeOne,
    BookItemRow,
    BookItemColumn,
} from '@components'

import { AtSearchBar } from 'taro-ui'
import './index.scss'

const baseClass = 'page'
export default class Home extends Component {

    config = {}
    
    constructor(props) {
        super(props)
    }
    
    state = {
        seachValue: '',
        hotBookList: [],
        lastestBookList: [],
    }
    
    /**
     * 页面加载前执行
     */
    componentWillMount() {
        this.loadHotBook()
        this.loadLastestBook()
    }

    /**
     * 加载热门书籍，写进action里面
     */
    loadHotBook = async () => {
        const url = `https://www.shuaixiaoxiao.com/wechat-return/home/home_getHotBook.php`
        const response = await fetch({ url })
        const { books_info } = response.data
        this.setState({
            hotBookList: books_info
        })
    }
    
    /**
     * 加载最新书籍，写进action里
     */
    loadLastestBook = async () => {
        const url = `https://www.shuaixiaoxiao.com/wechat-return/home/home_getBookInfo.php?show_items=0`
        const response = await fetch({ url })
        const { books_list } = response.data
        this.setState({
            lastestBookList: books_list
        })
    }

    /**
     * 搜索框内容change
     * @param {*} value 
     */
    seachValueOnChange (value) {
        this.setState({
            seachValue: value
        })
    }

    /**
     * 刷新热门书籍列表方法，需要设置只能5秒内刷新一次
     */
    handlerClickRefreshHot = async () => {
        this.loadHotBook()
    }

    /**
     * 跳转到更多新书页面
     */
    handlerClickMoreLastest = () => {
        Taro.navigateTo({url: '/pages/moreLastestBook/index'})
    }

    /**
     * 搜索按钮点击事件，跳转到搜索页面
     */
    seachOnActionClick () {
        Taro.navigateTo({url: `/pages/seach/index?seachValue=${this.state.seachValue}`})
    }

    render() {
        const { hotBookList, lastestBookList } = this.state
        return(
            <View className={baseClass}>
                <AtSearchBar
                  className={`${baseClass}-seachContainer`}
                  fixed
                  value={this.state.seachValue}
                  onChange={this.seachValueOnChange.bind(this)}
                  onActionClick={this.seachOnActionClick.bind(this)}
                />
                <View className={`${baseClass}-container`}>
                    <CategoryNavigate/>
                    <ShowTypeOne
                      extra='换一批'
                      title='热门书籍'
                      handler={this.handlerClickRefreshHot}
                    >
                        <Swiper
                          className='test-h'
                          indicatorColor='#999'
                          displayMultipleItems={3}
                          circular={true}
                          indicatorDots
                        >
                            {hotBookList.map((value) => {
                                const { pic, book_name, author, price, isbn } = value
                                return(
                                    <SwiperItem key={isbn}>
                                        <BookItemRow
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
                    <ShowTypeOne
                      extra='更多'
                      title='最新发布'
                      handler={this.handlerClickMoreLastest}
                    >
                        {lastestBookList.map((value) => {
                            const { pic, book_name, isbn, book_quantity, price } = value
                            return(
                                <BookItemColumn 
                                  key={isbn}
                                  pic={pic}
                                  book_name={book_name}
                                  book_quantity={book_quantity}
                                  price={price}
                                />
                            )
                        })}
                    </ShowTypeOne>
                </View>
            </View>
        )
    }
}