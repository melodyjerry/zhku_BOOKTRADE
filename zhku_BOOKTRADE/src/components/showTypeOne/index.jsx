import { Component } from "@tarojs/taro"
import { AtCard } from 'taro-ui'
import './index.scss'
import { View } from "@tarojs/components"

const baseClass = 'component'
export default class ShowTypeOne extends Component {

    // static defaultProps = {
    //     extra: '更多',
    //     title: '热门'
    // }

    constructor(props) {
        super(props)
    }

    state = {

    }

    handleClick = () => {

    }

    render() {
        const { extra, title, handler } = this.props
        return(
            <View className={baseClass}>
                {/* <AtCard
                  extra={extra}
                  title={title}
                >
                    {this.props.children}
                </AtCard> */}
                <View className={`${baseClass}-title`}>
                    <View className={`${baseClass}-title-bold`}>{title}</View>
                    <View className={`${baseClass}-title-grey`} onClick={handler}>{extra}</View>
                </View>
                <View className={`${baseClass}-container`}>
                   {this.props.children}
                </View>
            </View>
        )
    }
}