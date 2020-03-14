import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import * as actions from '@actions/book'
import { BookItemColumn, NullData } from '@components/'
import { connect } from '@tarojs/redux'


const baseClass = 'page'

@connect( state => state.book, { ...actions } )
class MoreLastestBook extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        show_items: 0,
    }

    async componentWillPreload(params) {
        // this.addMorebook()
    }

    config = {
        navigationBarTitleText: 'MORE'
    }
    
    async addMorebook() {
        this.setState({
            show_items: this.state.show_items+5
        }, () => {
            this.props.dispatchLoadMoreBook({ show_items: this.state.show_items })
        })
    }
    
    async onReachBottom() {
        const { hasMore } = this.props
        if (hasMore) await this.addMorebook()
        else Taro.showToast({ title: '没有更多了', icon: 'none' })
    }

    
    render() {
        const { lastestBook, hasMore } = this.props
        return(
            // <View>更多书籍，支持下拉刷新</View>
            <View className={`${baseClass}`}>
                {lastestBook && lastestBook.map((value, index) => {
                    const { pic, title, isbn, book_quantity, price } = value
                    return(
                        <BookItemColumn 
                          key={isbn}
                          isbn={isbn}
                          pic={pic || null}
                          book_name={title}
                          book_quantity={book_quantity}
                          price={price}
                        />
                    )
                })}
                {!hasMore && <NullData />}
            </View>
        )
    }
}

export default MoreLastestBook
