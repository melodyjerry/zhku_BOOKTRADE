import Taro, { Component, clearStorage } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { categoryArr, categoryItemsArr } from '@constants/category'
import * as actions from '@actions/category'
import { get, set } from '@utils/global_data'
import { AtTabsPane, AtTabs } from 'taro-ui'


import './index.scss'

const baseClass = 'page'
@connect( state => state.category, { ...actions } )
class AllCategory extends Component {

    constructor(props) {

    }

    state = {
        current: 0,
        categoryData: []
    }

    componentWillPreload(params) {

    }

    config = {
        navigationBarTitleText: 'TOTALCATEGORY'
    }

    
    async componentDidMount() {
        await this.props.dispatchLoadAllCategoryInfo()
        const { allCategoryInfo } = this.props
        let tempData = categoryItemsArr.map((value, index) => {
            return value.map((val, ind) => {
                return allCategoryInfo[val]
            })
        })
        this.setState({
            categoryData: tempData
        })
    }

    handleClick(value) {
        this.setState({
            current: value 
        })
    }

    toSingleCategory(e) {
        Taro.navigateTo({ url: `/pages/singleCategory/index?categoryType=${e}` })
    }

    renderAddNewView() {
        return (<View className={`${baseClass}-container-section`}></View>)
    }


    render() {
        const { categoryData } = this.state
        return(
            <View className={`${baseClass}`}>
                <AtTabs
                  current={this.state.current}
                  scroll
                  height='500px'
                  tabDirection='vertical'
                  tabList={categoryArr}
                  onClick={this.handleClick.bind(this)}>
                    <AtTabsPane tabDirection='vertical' current={this.state.current} index={0}>
                        <View className={`${baseClass}-container`}>
                            {
                                categoryData.length !== 0 && categoryData[0].map((value, index) => {
                                    const { str, picUrl, category_num, category_name } = value
                                    return (
                                        <View className={`${baseClass}-container-section`} onClick={ () => { this.toSingleCategory(category_name) } }>
                                            <Image className='image' mode='widthFix' src={picUrl} />
                                            <View className='name'>{str}</View>
                                            <View className='quantity'>库存：{category_num}</View>
                                        </View>
                                    )
                                })
                            }
                            {
                                this.renderAddNewView()
                            }
                        </View>
                    </AtTabsPane>
                    <AtTabsPane tabDirection='vertical' current={this.state.current} index={1}>
                        <View className={`${baseClass}-container`}>
                            {
                                categoryData.length !== 0 && categoryData[1].map((value, index) => {
                                    const { str, picUrl, category_num, category_name } = value
                                    return (
                                        <View className={`${baseClass}-container-section`} onClick={ () => { this.toSingleCategory(category_name) } }>
                                            <Image className='image' mode='widthFix' src={picUrl} />
                                            <View className='name'>{str}</View>
                                            <View className='quantity'>库存：{category_num}</View>
                                        </View>
                                    )
                                })
                            }
                            {
                                this.renderAddNewView()
                            }
                        </View>
                    </AtTabsPane>
                    <AtTabsPane tabDirection='vertical' current={this.state.current} index={2}>
                        <View className={`${baseClass}-container`}>
                            {
                                categoryData.length !== 0 && categoryData[2].map((value, index) => {
                                    const { str, picUrl, category_num, category_name } = value
                                    return (
                                        <View className={`${baseClass}-container-section`} onClick={ () => { this.toSingleCategory(category_name) } }>
                                            <Image className='image' mode='widthFix' src={picUrl} />
                                            <View className='name'>{str}</View>
                                            <View className='quantity'>库存：{category_num}</View>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </AtTabsPane>
                    <AtTabsPane tabDirection='vertical' current={this.state.current} index={3}>
                        <View className={`${baseClass}-container`}>
                            {
                                categoryData.length !== 0 && categoryData[3].map((value, index) => {
                                    const { str, picUrl, category_num, category_name } = value
                                    return (
                                        <View className={`${baseClass}-container-section`} onClick={ () => { this.toSingleCategory(category_name) } }>
                                            <Image className='image' mode='widthFix' src={picUrl} />
                                            <View className='name'>{str}</View>
                                            <View className='quantity'>库存：{category_num}</View>
                                        </View>
                                    )
                                })
                            }
                            {
                                this.renderAddNewView()
                            }
                            {
                                this.renderAddNewView()
                            }
                        </View>
                    </AtTabsPane>
                    <AtTabsPane tabDirection='vertical' current={this.state.current} index={4}>
                        <View className={`${baseClass}-container`}>
                            {
                                categoryData.length !== 0 && categoryData[4].map((value, index) => {
                                    const { str, picUrl, category_num, category_name } = value
                                    return (
                                        <View className={`${baseClass}-container-section`} onClick={ () => { this.toSingleCategory(category_name) } }>
                                            <Image className='image' mode='widthFix' src={picUrl} />
                                            <View className='name'>{str}</View>
                                            <View className='quantity'>库存：{category_num}</View>
                                        </View>
                                    )
                                })
                            }
                            {
                                this.renderAddNewView()
                            }
                        </View>
                    </AtTabsPane>
                </AtTabs>
            </View>
        )
    }
}

export default AllCategory