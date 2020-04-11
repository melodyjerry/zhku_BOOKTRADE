import Taro, { Component } from "@tarojs/taro"
import { View } from '@tarojs/components'
import { BookItemColumn, NullData } from '@components'
import { AtSearchBar, AtTabBar, AtToast } from 'taro-ui'
import * as actions from '@actions/book'
import { connect } from "@tarojs/redux"

import './index.scss'
import { set, get } from "@utils/global_data"

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
        this.setState({ seachValue })
        await this.props.dispatchSearchBook({ keyword: seachValue, currentType: 1 })
    }

    config = {
        navigationBarTitleText: 'SEACH'
    }

    async handleTabClick(value) {
        if (value === 0 || value === 2) return Taro.showToast({ title: '暂不支持', icon: 'none' })
        this.setState({ current: value, isOpened: true }, () => {
            this.props.dispatchSearchBook({ keyword: this.state.seachValue, currentType: parseInt(value) })
        })
    }

    seachValueOnChange (value) {
        set('key', value.detail.value)
        // this.setState({ isOpened: false })
    }

    seachOnActionClick() {
        const { current } = this.state
        const seachValue = get('key')
        if ((Object.keys(seachValue)).length === 0) return Taro.showToast({ title: '搜索字符不能为空', icon: 'none' })
        this.setState({ isOpened: true }, () => {
            this.props.dispatchSearchBook({ keyword: seachValue, currentType: parseInt(current) })
            this.setState({ isOpened: false })
        })
    }

    render() {
        const { seachBook } = this.props
        const { seachValue, isOpened } = this.state
        return(
            <View>
                <AtSearchBar 
                  value={seachValue}
                  onBlur={this.seachValueOnChange.bind(this)}
                  onActionClick={this.seachOnActionClick.bind(this)}
                />
                <View className='page'>
                    {isOpened && 
                        <AtToast isOpened text="加载中" status='loading' isOpened={isOpened}></AtToast>
                    }
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
                    {(!isOpened && seachBook && Object.keys(seachBook)).length !== 0 && seachBook.map((value, index) => {
                        const { pic, book_name, book_price, isbn, book_quantity } = value
                            return(
                                <BookItemColumn
                                    key={isbn}
                                    seachKey={get('key')}
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