import Taro, { Component } from "@tarojs/taro"
import { View } from '@tarojs/components'
import { BookInfo } from '@components/'
import { connect } from '@tarojs/redux'
import { commentIcon } from '@constants/cloudIcon'
import { AtCard, AtRate, AtTextarea, AtButton } from 'taro-ui'
import * as actions from '@actions/book'
import * as commentActions from '@actions/comment'

import './index.scss'

let moment = require('moment')
const baseClass = 'page'

@connect(state => state.book, { ...actions, ...commentActions })
class Comment extends Component {

    config = {
        navigationBarTitleText: 'BECOMMENT'
    }

    state = {
        rate: 4,
        content: ''
    }

    async componentDidMount() {
        const { isbn } = this.$router.params
        const { dispatchLoadBookInfo } = this.props
        const payload = { isbn: isbn }
        await dispatchLoadBookInfo(payload)
    }

    handleChange = (params) => {
        const { key, value } = params
        this.setState({ [key]: value })
    }

    submit = () => {
        const { rate, content } = this.state
        const { dispatchSubmitComment, bookInfo } = this.props
        let payload = {
            isbn: bookInfo.isbn,
            score: parseInt(rate),
            commentStr: content,
        }
        dispatchSubmitComment(payload)
    }

    render() {
        const { bookInfo } = this.props
        const { content, rate } = this.state 
        return(
            <View className={`${baseClass}`}>
                <View className={`${baseClass}-imageView`}>
                    <BookInfo 
                        data={bookInfo}
                        showQuantity={false}
                    />
                </View>
                <View className={`${baseClass}-commentView`}>
                    <AtCard 
                        isFull={true}
                        note={moment().calendar()}
                        title='评论'
                        thumb={commentIcon}
                    >
                        <AtRate
                            size='15'
                            margin={10}
                            value={rate}
                            onChange={e => { this.handleChange({key: 'rate', value: e}) }}
                        />
                        <View className={`${baseClass}-commentView-comment`}>
                            <AtTextarea
                                value={content}
                                maxLength={200}
                                placeholder='你的评论是...'
                                onChange={e => { this.handleChange({key: 'content', value: e.target.value}) }}
                            />
                        </View>
                    </AtCard>
                </View>
                <View className={`${baseClass}-buttonView`}>
                    <AtButton 
                        type='primary' 
                        size='normal'
                        onClick={this.submit}
                    >提交</AtButton>
                </View>
            </View>
        )
    }
}

export default Comment