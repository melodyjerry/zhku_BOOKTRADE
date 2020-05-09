import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import * as actions from '@actions/book'
import { BookItemColumn, NullData, Loading } from '@components/'
import { connect } from '@tarojs/redux'
import { shortid } from '@utils/methods'


const baseClass = 'page'

@connect( state => state.book, { ...actions } )
class MoreLastestBook extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        show_items: -5,
    }


    componentDidMount = () => {
        this.addMorebook()
    }

    config = {
        navigationBarTitleText: 'MORE'
    }
    
    async addMorebook() {
        const { show_items } = this.state
        this.setState({
            show_items: show_items+5
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
                {lastestBook.length !== 0 && lastestBook.map((value, index) => {
                    const { pic, title, isbn, book_quantity, price } = value
                    return(
                        <BookItemColumn 
                          key={shortid(index)}
                          isbn={isbn}
                          pic={pic || null}
                          book_name={title}
                          book_quantity={book_quantity}
                          price={price}
                        />
                    )
                })}
                {hasMore === false ? 
                <NullData />
                :
                <Loading />
                }
            </View>
        )
    }
}

export default MoreLastestBook
