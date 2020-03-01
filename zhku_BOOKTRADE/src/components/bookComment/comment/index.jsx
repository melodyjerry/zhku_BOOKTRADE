import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtCard } from 'taro-ui'

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
                  title={`user:${openId}`}
                >
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
