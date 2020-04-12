import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { DragDropContext , Draggable, Droppable } from 'react-beautiful-dnd'
import { add, minus, asyncAdd } from '@actions/counter'
import * as actions from '@actions/user'



import './index.scss'

@connect(state => state.user, { ...actions })
class Index extends Component {

  
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }
  
  componentWillUnmount () { }
  
  componentDidShow () { }
  
  componentDidHide () { }

  componentDidMount () {
    // console.log(this.props)
  }
  
  config = {
    navigationBarTitleText: '测试页面'
  }

  logIn() {
    const { dispatchLogIn } = this.props
    dispatchLogIn()
  }

  logOut() {
    const { dispatchLogOut } = this.props
    dispatchLogOut()
  }

  onDragStart = () => {
    console.log('开始拖拽')
  }

  onDragEnd = () => {
    console.log('结束拖拽')
  }

  onDragUpdate = () => {
    console.log('正在拖拽')
  }
  
  render () {
    const { isLogin } = this.props
    return (
      // <View className='index'>
      //   <Button className='add_btn' onClick={this.props.add}>+</Button>
      //   <Button className='dec_btn' onClick={this.props.dec}>-</Button>
      //   <Button className='dec_btn' onClick={this.props.asyncAdd}>async</Button>
      //   <View><Text>{this.props.counter.num}</Text></View>
      //   <View><Text>Hello, World</Text></View>
      // </View>
      <View>
          <View>{isLogin && <View>已登录</View>}</View>
          <Button
              // onClick={this.logIn.bind(this)}
              onClick={this.props.dispatchLogIn}
          >登录</Button>
          <Button
              onClick={this.logOut.bind(this)}
          >登出</Button>
          <View>
            <View>拖拽组件</View>
            <DragDropContext
              onDragStart={this.onDragStart}
              onDragEnd={this.onDragEnd}
              onDragUpdate={this.onDragUpdate}
            >
              <View>Hello World</View>
            </DragDropContext>
          </View>
      </View>
    )
  }
}

export default Index
