import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import 'taro-ui/dist/style/index.scss' // 全局引入一次即可

import Index from './pages/index'


import configStore from './store'
import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {

  config = {
    pages: [
      // 'pages/index/index'
      'pages/home/index',
      'pages/seach/index',
      'pages/user/index',
      'pages/singleCategory/index',
      'pages/allCategory/index',
      'pages/moreLastestBook/index',
      'pages/book/index',
      'pages/userCensor/index',
      'pages/test/index',
      // 'pages/censor/index',
    ],
    tabBar: {
      color: "#666",
      selectedColor: "#000000",
      backgroundColor: "#F1F1F1",
      borderStyle: 'black',
      list: [{
        pagePath: "pages/home/index",
        iconPath: "./assets/tab-bar/首页.png",
        selectedIconPath: "./assets/tab-bar/首页s.png",
        text: "首页 "
      },{
        pagePath: "pages/user/index",
        iconPath: "./assets/tab-bar/用户.png",
        selectedIconPath: "./assets/tab-bar/用户s.png",
        text: "个人页面"
      }]
    },
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '仲恺旧书平台',
      navigationBarTextStyle: 'black'
    }
  }


  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
