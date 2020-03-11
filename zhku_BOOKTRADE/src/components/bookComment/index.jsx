import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { NullData } from '@components/'
import { AtAccordion } from 'taro-ui'

import './index.scss'
import { Comment } from './comment'

const baseClass = 'bookComment'

export default class BookComment extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        open: false,
    }

    handleClick = (value) => {
        this.setState({
            open: value
        })
    }

    componentDidMount() { }
    
    render () {
        const { data } = this.props
        return(
            <View className={`${baseClass}`}>
                <AtAccordion
                  open={this.state.open}
                  onClick={this.handleClick.bind(this)}
                  title='评论'
                >
                    {data.length !== 0 ? 
                    <View className={`${baseClass}-main`}>
                        {data.map((value, index) => {
                            const { OpenID, isbn, score, evaluate, date } = value
                            return (
                                <View key={OpenID}>
                                    <Comment 
                                      openId={OpenID}
                                      isbn={isbn}
                                      score={score}
                                      evaluate={evaluate}
                                      date={date}
                                    />
                                </View>
                            )
                        })}
                    </View> :
                    <View className={`${baseClass}-main`}>
                        <NullData />
                    </View>
                    }
                </AtAccordion>
            </View>
        )
    }
}

BookComment.defaultProps = {
    data: [],
}
