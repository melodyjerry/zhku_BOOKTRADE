import Taro, { Component } from "@tarojs/taro"
import { View } from "@tarojs/components"
import { AtAvatar, AtIcon } from 'taro-ui'


import './index.scss'

const baseClass = 'component'
export default class CensorItem extends Component {

    defaultProps = {
        censorItem: {}
    }

    render() {
        const { Censor_id=null, Credit=null, OpenID=null, add_time=null, pic=null, title=null, censor=false, beEvaluated=false, isbn=null, goCommentBook=null, dealCensor=null, price=null, state=null } = this.props
        return(
            <View className={`${baseClass}`}>
                <View className={`${baseClass}-imageHolder $page-background`}>
                    <AtAvatar 
                        image={pic} 
                        size='large'
                    />
                </View>
                <View className={`${baseClass}-infoHolder`}>
                    {Censor_id && 
                        <View className={`${baseClass}-infoHolder-msg`}>订单号码：{Censor_id}</View>
                    }
                    {title && 
                        <View className={`${baseClass}-infoHolder-msg`}>书籍名称：{title}</View>
                    }
                    {OpenID && 
                        <View className={`${baseClass}-infoHolder-msg`}>用户代号：{OpenID}</View>
                    }
                    {Credit && 
                        <View className={`${baseClass}-infoHolder-msg`}>剩余积分：{Credit}</View>
                    }
                    {add_time && 
                        <View className={`${baseClass}-infoHolder-msg`}>申请时间：{add_time}</View>
                    }
                </View>
                {censor && 
                    <View className={`${baseClass}-agreeHolder`}>
                        <View 
                            className={`${baseClass}-agreeHolder-agree`}
                            onClick={dealCensor.bind(this, { action: 'agree', OpenID, isbn, price, Censor_id, title, pic})}
                        >同意</View>
                        <View 
                            className={`${baseClass}-agreeHolder-disAgree`}
                            onClick={dealCensor.bind(this, { action: 'disagree', OpenID, isbn, price, Censor_id, title, pic })}
                        >驳回</View>
                    </View>
                }
                {beEvaluated && 
                    <View className={`${baseClass}-evaluatHolder`}>
                        <View 
                            className={`${baseClass}-evaluatHolder-evaluat`}
                            onClick={goCommentBook.bind(this, {isbn: isbn})}
                        >评价</View>
                    </View>
                }
                {state && 
                    <View className={`${baseClass}-stateHolder`}>
                        <View className='at-icon at-icon-chevron-right'></View>
                        <View 
                            className={`${baseClass}-stateHolder-${state === '1' ? 'gray' : state === '2' ? 'green' : 'red'}`}
                        >{state === '1' ? '进行中' : (state === '2' ? '通过' : '被驳回')}</View>
                    </View>
                }
            </View>
        )
    }
}