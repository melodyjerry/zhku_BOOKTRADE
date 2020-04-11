import Taro, { Component, PureComponent } from "@tarojs/taro"
import { View } from "@tarojs/components"
import './index.scss'

const baseClass = 'component'
export default class ShowTypeOne extends PureComponent {

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