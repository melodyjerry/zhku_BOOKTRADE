import Taro, { Component } from "@tarojs/taro"
import { NullData, CensorItem } from '@components/'
import * as actions from '@actions/censor'
import { API_DEAL_CENSOR } from '@constants/api'
import fetch from '@utils/request'

import { connect } from "@tarojs/redux"
import { View } from "@tarojs/components"

import './index.scss'

const baseClass = 'page'

@connect( state => state.censor, { ...actions } )
class Censor extends Component {
    
    defaultProps = {
        censorList: []
    }

    async componentDidMount() {
        await this.props.dispatchLoadAllCensor()
    }

    config = {
        navigationBarTitleText: 'CENSOR'
    }

    dealCensor = async (params) => {
        const { action } = params
        let request = {
            url: API_DEAL_CENSOR,
            payload: {
                openid: params.OpenID,
                judge: params.action,
                isbn: params.isbn,
                price: params.price,
                censorid: params.Censor_id,
                title: params.title,
                pic: params.pic,
                credit: Number(params.credit),
                reson: params.reson,
            }
        }
        try {
            const response = await fetch(request)
            console.log(response)
            if(response.data.ret === 0) Taro.showToast({ title: '操作成功', icon: 'success' })
            else if (response.data.ret === 1) Taro.showToast({ title: '操作失败', icon: 'none' })
            this.componentDidMount()
        } catch (err) {
            Taro.showToast({ title: err, icon: 'none' })
        }
    }

    render() {
        const { censorList } = this.props
        return(
            <View className={`${baseClass}`}>
                {(Object.keys(censorList)).length !== 0 && censorList.map((value, index) => {
                        const { Censor_id, Credit, credit, OpenID, add_time, pic, title, isbn, price, state } = value
                            return(
                                <CensorItem
                                    isbn={isbn}
                                    Censor_id={Censor_id}
                                    price={price}
                                    Credit={Credit}
                                    credit={credit}
                                    OpenID={OpenID}
                                    add_time={add_time}
                                    pic={pic}
                                    title={title}
                                    censor={true}
                                    beEvaluated={false}
                                    dealCensor={this.dealCensor}
                                    userState={state}
                                />
                            )
                    })}
                {(Object.keys(censorList)).length === 0 && <NullData/>} 
            </View>
        )
    }
}

export default Censor