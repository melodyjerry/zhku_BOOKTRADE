import Taro, { Component } from "@tarojs/taro"
import { View } from '@tarojs/components'
import { BookItemColumn, NullData } from '@components/'
import * as actions from '@actions/category'
import { get, set } from '@utils/global_data'

import { AtSearchBar, AtTabBar } from 'taro-ui'



import './index.scss'
import { connect } from "@tarojs/redux"


const baseClass = 'page'
@connect( state => state.category, { ...actions } )
class SingleCategory extends Component {

    constructor(props) {
        super(props)
    }

    async componentWillPreload(params) {
        const { categoryType } = params
        this.loadCategoryBook({ categoryType })
    }

    config = {
        navigationBarTitleText: 'CATEGORY'
    }

    componentDidMount() {
        if ( this.props.singleCategoryInfo.ret === -1 ) {
            Taro.showToast({ title: '暂无数据', icon: 'none' }).then(() => {
                setTimeout(() => {
                    Taro.navigateBack()
                }, 2000);
            })
        }
    }

    async loadCategoryBook(params) {
        const { categoryType, sortTypeIndex=3, bookTypeIndex=-1 } = params
        await this.props.dispatchLoadSingleCategoryInfo({
            bookTypeIndex: bookTypeIndex, 
            bookTypeStr: categoryType, 
            sortTypeIndex: sortTypeIndex
        })
        this.setState({
            categoryType: categoryType
        })
    }

    state = {
        categoryType: 'A',
        current: 3,
    }

    defaultProps = {
        singleCategoryInfo: []
    }

    handleClick(value) {
        const { categoryType } = this.$router.params
        this.setState({
            current: value
        }, () => {
            this.loadCategoryBook({ categoryType: categoryType, sortTypeIndex: value })
        })
    }

    showNullData() {
        return <NullData />
    }

    /**
     * 搜索框内容change
     * @param {*} value 
     */
    seachValueOnChange (value) {
        set('key', value.detail.value)
    }

    /**
     * 搜索按钮点击事件，跳转到搜索页面
     */
    seachOnActionClick = async (e) => {
        const key = get('key')
        Taro.navigateTo({url: `/pages/seach/index?seachValue=${key}`})
    }

    render() {
        const { singleCategoryInfo } = this.props
        return(
            <View className={`${baseClass}`}>
                <AtSearchBar
                  className={`${baseClass}-seachContainer`}
                  fixed
                  value={this.state.seachValue}
                  onBlur={this.seachValueOnChange.bind(this)}
                  onActionClick={e => { this.seachOnActionClick(e) }}
                />
                <AtTabBar
                    tabList={[
                    { title: '综合' },
                    { title: '时间' },
                    { title: '热度' },
                    { title: '价格' },
                ]}
                    onClick={this.handleClick.bind(this)}
                    current={this.state.current}
                />
                <View className={`${baseClass}-container`}>
                    {singleCategoryInfo.books_list && singleCategoryInfo.books_list.map((value, index) => {
                        const { title, isbn, price, pic, book_quantity } = value
                        return <BookItemColumn 
                                key={isbn}
                                isbn={isbn}
                                pic={pic}
                                book_name={title}
                                book_quantity={book_quantity}
                                price={price}
                            />
                    })}
                    {this.showNullData()}
                </View>
            </View>
        )
    }
}

export default SingleCategory