import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtCard, AtRate } from 'taro-ui'

import './index.scss'

const baseClass = 'component'

export default class Comment extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() { }
    
    render () {
        const { openId, score, evaluate, date } = this.props
        return(
            <View className={`${baseClass}`}>
                <AtCard
                  note={`发布时间:${date}`}
                  title={`${openId}`}
                  thumb='https://www.shuaixiaoxiao.com/assets/user/评论用户.png'
                >
                    <AtRate
                      size={10}
                      value={parseInt(score)}
                    />
                {evaluate}
                </AtCard>
            </View>
        )
    }
}

Comment.defaultProps = {
    openId: '',
    isbn: '',
    score: '',
    evaluate: '',
    date: ''
}
