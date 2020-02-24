import Taro, { Component } from "@tarojs/taro"
import { View } from '@tarojs/components'
import './index.scss'

export default class SingleCategory extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        params: this.$router.params
    }

    render() {
        // console.log(this.state.params.categoryType)
        return(
            <View>
                分类:{this.state.params.categoryType}
            </View>
        )
    }
}