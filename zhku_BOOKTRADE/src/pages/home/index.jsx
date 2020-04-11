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
import { API_GET_LASTEST_BOOK, API_GET_USER_DBINFO } from '@constants/api'
import * as actions from '@actions/book'
import { getUserOpenId, getUserInfo } from '@utils/user'
import * as userActions from '@actions/user'
import { superUser } from '@constants/superUser'
import { get, set } from '@utils/global_data'
import { shortid } from '@utils/methods'
import { AtSearchBar, AtFab, AtButton } from 'taro-ui'
import scan from '@assets/scan/scan.svg'
import './index.scss'
import { connect } from "@tarojs/redux"

const baseClass = 'page'

@connect( state => {return {...state.book, ...state.user}}, { ...actions, ...userActions } )
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
    
    shouldComponentUpdate(nextState, nextProps) {
        const { seachValue } = this.state
        if (seachValue !== nextState.seachValue) return true
        return false
    }

    /**
     * 页面加载前执行
     */
    async componentWillMount() {
        const { lastestBook, dispatchLoadMoreBook } = this.props
        this.loadHotBook()
        // dispatchLoadMoreBook({ show_items: 0 })
        const request = {
            url: API_GET_LASTEST_BOOK,
        }
        try {
            const response = await fetch(request)
            this.setState({
                lastestBookList: response.data.books_list
            })
        } catch(err) { console.log(err) }
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
        this.setState({ seachValue: value.detail.value })
        set('key', value.detail.value)
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
    seachOnActionClick = async (e) => {
        const key = get('key')
        Taro.navigateTo({url: `/pages/seach/index?seachValue=${key}`})
    }

    async dispatchLogin (type, e) {
        if (e.detail.errMsg === 'getUserInfo:ok') {
            await this.logIn() 
            this.onButtonClick({ type: type })
        } else { 
            Taro.showToast({ title: '必须登录后才能交易', icon: 'none' })
        }
    }

    // 这里的登录事件要改 
    logIn = async () => {
        const { dispatchLogIn } = this.props
        const storage = await getUserOpenId()
        const userInfo = await getUserInfo()
        dispatchLogIn()                          // 修改登录状态
        superUser.map((value, index) => {
            if (value === storage.data.openid) {
                set('isSuperUser', true)
            }
        })
        const request = {
            url: API_GET_USER_DBINFO,
            payload: { openid: storage.data.openid }
        }
        const response = await fetch(request)
        set('openId', storage.data.openid)
        set('userInfo', userInfo)
        set('userDBInfo', response.data.userInfo)
    }

    onButtonClick (payload) {
        const { type } = payload
        const userDBInfo = get('userDBInfo')
        if (Number(userDBInfo[0].state) === 1) {
            Taro.showToast({  title: '您已被禁止交易,请联系管理员解封', icon: 'none', duration: 4000})
            return
        }
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
        const { hotBookList, isSuperUser, lastestBookList } = this.state
        return(
            <View className={`${baseClass}`}>
                <View className={`${baseClass}-flow`}>
                    {isSuperUser &&
                        <View className={`${baseClass}-flow-censor`}>
                            <AtFab className='CensorFab' onClick={this.onButtonClick.bind(this, { type:'censor'} )}>
                                <Text className='at-fab__icon at-icon at-icon-bullet-list'></Text>
                            </AtFab>
                        </View>
                    }
                    <View className={`${baseClass}-flow-subget`}>
                        <AtFab 
                            // onClick={this.onButtonClick.bind(this, { type: 'sub'} )}
                        >
                            {/* <Text className='at-fab__icon at-icon at-icon-upload'></Text> */}
                            <AtButton openType='getUserInfo' onGetUserInfo={this.dispatchLogin.bind(this, 'sub')}>
                                <View className={`${baseClass}-flow-subget-value`}>
                                    <Image src={scan} className={`${baseClass}-flow-subget-icon`} />
                                    <Text>
                                        捐书
                                    </Text>
                                </View>
                            </AtButton>
                        </AtFab>
                        <AtFab 
                            // onClick={this.onButtonClick.bind(this, { type: 'get'} )}
                        >
                            {/* <Text className='at-fab__icon at-icon at-icon-download'></Text> */}
                            <AtButton openType='getUserInfo' onGetUserInfo={this.dispatchLogin.bind(this, 'get')}>
                                <View className={`${baseClass}-flow-subget-value`}>
                                    <Image src={scan} className={`${baseClass}-flow-subget-icon`} />
                                    <Text>
                                        取书
                                    </Text>
                                </View>
                            </AtButton>
                        </AtFab>
                    </View>
                </View>
                <AtSearchBar
                  className={`${baseClass}-seachContainer`}
                  fixed
                  value={this.state.seachValue}
                  onBlur={this.seachValueOnChange.bind(this)}
                  onActionClick={e => { this.seachOnActionClick(e) }}
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
                    <ShowTypeOne
                      extra='更多'
                      title='最新发布'
                      handler={this.handlerClickMoreLastest}
                    >
                        {lastestBookList && lastestBookList.map((value, index) => {
                            const { pic, title, isbn, book_quantity, price } = value
                            return(
                                <BookItemColumn 
                                  key={shortid(index)}
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