import Taro, { Component } from "@tarojs/taro"
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { NullData, CensorItem } from '@components/'
import * as actions from '@actions/comment'

const baseClass = 'page'

@connect(state => state.comment, { ...actions })
class BeCommentList extends Component {

    config = {
        navigationBarTitleText: 'COMMENTLIST'
    }

    async componentDidMount() {
        const openId = Taro.getStorageSync( 'openId' )
        const payload = {
            state: 2,  // 取书
            isComment: 0, // 未评价
        }
        this.props.dispatchLoadBeCommentBook(payload)
    }

    goCommentBook(params) {
        const { isbn } = params
        Taro.navigateTo({ url: `/pages/beCommentList/comment/index?isbn=${isbn}` })
    }


    render() {
        const { beCommentedBook } = this.props
        return (
            <View>
                {beCommentedBook.length !== 0 && beCommentedBook.map((value, index) => {
                    const { Censor_id=null, Credit=null, OpenID=null, date, pic, isbn, state, title } = value
                    return(
                        <CensorItem
                            isbn={isbn}
                            Censor_id={Censor_id}
                            Credit={Credit}
                            OpenID={OpenID}
                            add_time={date}
                            pic={pic}
                            title={title}
                            censor={false}
                            beEvaluated={true}
                            goCommentBook={this.goCommentBook}
                        />
                    )
                })}
                {beCommentedBook.length === 0 && <NullData />}
            </View>
        )
    }
}

export default BeCommentList