import Taro, { Component } from "@tarojs/taro"
import { View } from "@tarojs/components"
import { AtCard } from 'taro-ui'
import './index.scss'

export default class ShowTypeOne extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        current: 0,
    }

    handleClick = () => {

    }

    render() {

        return(
            <AtCard
              
            />
        )
    }
}