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
import * as actions from '@actions/book'
import { get } from '@utils/global_data'
import { AtSearchBar, AtFab } from 'taro-ui'
import './index.scss'
import { connect } from "@tarojs/redux"

const baseClass = 'page'

@connect( state => state.book, { ...actions } )
class Home extends Component {

    constructor(props) {
        super(props)
    }
    
    state = {
        isSuperUser: false,
        seachValue: '',
        hotBookList: [],
        lastestBookList: [],
    }
    
    /**
     * 页面加载前执行
     */
    componentWillMount() {
        this.loadHotBook()
        this.props.dispatchLoadMoreBook({ show_items: 0 })
    }
    
    config = {
        navigationBarTitleText: 'ZHKUCLOUD'
    }
    
    componentDidShow() {
        const isSuperUser = get('isSuperUser')
        this.setState({ isSuperUser })
        this.componentWillMount()    //重新加载页面
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

    onButtonClick (payload) {
        const { type } = payload
        switch(type) {
            case 'sub': {
                return Taro.scanCode().then(res => {
                    Taro.navigateTo({ url: `/pages/book/index?isbn=${res.result}&type=${type}` })
                }).catch(() => { })
            }
            case 'get': {
                return Taro.scanCode().then(res => {
                    Taro.navigateTo({ url: `/pages/book/index?isbn=${res.result}&type=${type}` })
                }).catch(() => { })
            }
            case 'censor': {
                return Taro.navigateTo({ url: `/pages/censor/index` })
            }
            default: {
                return
            }
        }
    }

    render() {
        const { hotBookList, isSuperUser } = this.state
        const { lastestBook } = this.props
        return(
            <View className={`${baseClass}`}>
                <View className={`${baseClass}-flow`}>
                    {isSuperUser &&
                        <View className={`${baseClass}-flow-censor`}>
                            <AtFab onClick={this.onButtonClick.bind(this, { type:'censor'} )}>
                                <Text className='at-fab__icon at-icon at-icon-bullet-list'></Text>
                            </AtFab>
                        </View>
                    }
                    <View className={`${baseClass}-flow-subget`}>
                        <AtFab onClick={this.onButtonClick.bind(this, { type: 'sub'} )}>
                            <Text className='at-fab__icon at-icon at-icon-upload'></Text>
                        </AtFab>
                        <AtFab onClick={this.onButtonClick.bind(this, { type: 'get'} )}>
                            <Text className='at-fab__icon at-icon at-icon-download'></Text>
                        </AtFab>
                    </View>
                </View>
                <AtSearchBar
                  className={`${baseClass}-seachContainer`}
                  fixed
                  value={this.state.seachValue}
                  onChange={this.seachValueOnChange.bind(this)}
                  onActionClick={this.seachOnActionClick.bind(this)}
                />
                <View className={`${baseClass}-container`}>
                    <CategoryNavigate />
                    <ShowTypeOne
                      extra='换一批'
                      title='热门书籍'
                      handler={this.handlerClickRefreshHot}
                    >
                        <Swiper
                          className='test-h'
                          indicatorColor='#999'
                          displayMultipleItems={3}
                          indicatorDots
                        >
                            {hotBookList.map((value, index) => {
                                const { pic, book_name, author, price, isbn, fever } = value
                                return(
                                    <SwiperItem key={index}>
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
                    <ShowTypeOne
                      extra='更多'
                      title='最新发布'
                      handler={this.handlerClickMoreLastest}
                    >
                        {lastestBook && lastestBook.map((value, index) => {
                            const { pic, title, isbn, book_quantity, price } = value
                            return(
                                <BookItemColumn 
                                  key={index}
                                  isbn={isbn}
                                  pic={pic}
                                  book_name={title}
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

export default Home