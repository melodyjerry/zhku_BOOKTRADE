import Taro, { Component } from "@tarojs/taro"
import { View } from '@tarojs/components'
import { BookItemColumn, NullData } from '@components'
import { AtSearchBar, AtTabBar, AtToast } from 'taro-ui'
import * as actions from '@actions/book'
import { connect } from "@tarojs/redux"

import './index.scss'

@connect(state => state.book, { ...actions })
class Seach extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        current: 1,
        seachValue: '',
        isOpened: false,
    }

    async componentWillPreload(params) {
        const { seachValue } = params
        this.setState({ seachValue, seachValue: false })
        await this.props.dispatchSearchBook({ keyword: seachValue, currentType: 1 })
    }

    config = {
        navigationBarTitleText: 'MORE'
    }

    async handleTabClick(value) {
        if (value === 0 || value === 2) return Taro.showToast({ title: '暂不支持', icon: 'none' })
        this.setState({ current: value, isOpened: true }, () => {
            this.props.dispatchSearchBook({ keyword: this.state.seachValue, currentType: parseInt(value) })
        })
    }

    seachValueOnChange (value) {
        this.setState({ seachValue: value, isOpened: false })
    }

    seachOnActionClick() {
        const { current, seachValue } = this.state
        if ((Object.keys(seachValue)).length === 0) return Taro.showToast({ title: '搜索字符不能为空', icon: 'none' })
        this.setState({ isOpened: true }, () => {
            this.props.dispatchSearchBook({ keyword: seachValue, currentType: parseInt(current) })
        })
    }

    render() {
        const { seachBook } = this.props
        const { seachValue, isOpened } = this.state
        return(
            <View>
                <AtSearchBar 
                  fixed
                  value={seachValue}
                  onChange={this.seachValueOnChange.bind(this)}
                  onActionClick={this.seachOnActionClick.bind(this)}
                />
                <View className='page'>
                    <AtToast isOpened text="加载中" status='loading' duration={1000} isOpened={isOpened}></AtToast>
                    <AtTabBar
                        tabList={[
                        { title: '综合' },
                        { title: '时间' },
                        { title: '热度' },
                        { title: '价格' },
                    ]}
                        onClick={this.handleTabClick.bind(this)}
                        current={this.state.current}
                    />
                    {(Object.keys(seachBook)).length !== 0 && seachBook.map((value, index) => {
                        const { pic, book_name, book_price, isbn, book_quantity } = value
                            return(
                                <BookItemColumn 
                                    key={isbn}
                                    isbn={isbn}
                                    pic={pic}
                                    book_name={book_name}
                                    book_quantity={book_quantity}
                                    price={book_price}
                                />
                            )
                    })}
                    {(Object.keys(seachBook)).length === 0 && <NullData />}
                </View>
            </View>
        )
    }
}

export default Seach