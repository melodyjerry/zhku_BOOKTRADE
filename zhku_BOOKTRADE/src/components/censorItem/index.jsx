import Taro, { Component } from "@tarojs/taro"
import { View, Image, Label, Textarea, Input } from "@tarojs/components"
import moment from 'moment'
import { AtAvatar, AtModal, AtModalHeader, AtModalContent, AtModalAction } from 'taro-ui'
import { API_GET_USER_RECORD, API_UPDATE_USER_STATE } from '@constants/api'
import fetch from '@utils/request'
import icons from '@assets/censor'


import './index.scss'

const baseClass = 'component'
export default class CensorItem extends Component {

    defaultProps = {
        censorItem: {},
        userRecord: [],
        reson: '',
    }

    state = {
        isRecordOpened: false,
        isStateOpened: false,
        isResonOpened: false,
    }

    openRecordModel = async (boolStr) => {
        const { OpenID } = this.props
        this.setState({ isRecordOpened: boolStr })
        if (boolStr === true) this.getUserRecord({ openid:OpenID })
    }

    openStateModel = async (boolStr) => {
        this.setState({ isStateOpened: boolStr })
    }

    openResonModel = async (boolStr) => {
        this.setState({ isResonOpened: boolStr })
    }

    /**
     * 处理驳回操作
     */
    handleResonConfirm = async () => {
        const { 
            Censor_id=null, 
            credit=null,
            OpenID=null, 
            pic=null, 
            title=null, 
            isbn=null, 
            dealCensor=null, 
            price=null, 
        } = this.props
        const { reson } = this.state
        dealCensor && dealCensor({ action: 'disagree', OpenID, isbn, price, Censor_id, title, pic, credit, reson })
        this.openResonModel(false)
    }

    getUserRecord = async (payload) => {
        const { openid } = payload
        const request = {
            url: API_GET_USER_RECORD,
            payload: { openid }
        }
        try {
            const response = await fetch(request)
            this.setState({
                userRecord: response.data.userRecord
            })
        } catch(err) { console.log(err) }
    }

    handleConfirm = async (payload) => {
        const { openid } = payload
        const request = {
            url: API_UPDATE_USER_STATE,
            payload: {
                openid,
                state: 1
            }
        }
        try {
            const response = await fetch(request)
            this.openStateModel(false)
        } catch(err) { console.log(err) }
    }

    handleTextareaChange = (e) => {
        this.setState({ reson: e.detail.value, })
    }

    render() {
        const { 
            Censor_id=null, 
            userState=null,
            Credit=null, 
            credit=null,
            OpenID=null, 
            add_time=null, 
            pic=null, 
            title=null, 
            censor=false, 
            beEvaluated=false, 
            isbn=null, 
            goCommentBook=null, 
            dealCensor=null, 
            price=null, 
            state=null 
        } = this.props
        const { isRecordOpened, isStateOpened, isResonOpened, userRecord, reson } = this.state
        return(
            <View className={`${baseClass}`}>
                <AtModal 
                    className={`${baseClass}-modal`}
                    isOpened={Boolean(isRecordOpened)}
                    closeOnClickOverlay
                    onClose={this.openRecordModel.bind(this, false)}
                >
                    <AtModalHeader>ID：{OpenID}</AtModalHeader>
                    <AtModalContent>
                        <View>剩余积分：{Credit}，状态：<Label className={Number(userState) === 0 ? 'green' : 'red' }>{Number(userState) === 0 ? '正常' : '被禁止'}</Label></View>
                        {userRecord && userRecord.map((item, index) => {
                        return <View className={`${baseClass}-modal-item`}>
                            {moment(item.date).format('YYYY-MM-DD')},{item.isComment === 0 ? '取' : '捐'},{item.credit || '无'}积分,title：{item.title}，
                            </View>
                        })}
                    </AtModalContent>
                </AtModal>
                <AtModal 
                    isOpened={Boolean(isStateOpened)}
                    closeOnClickOverlay
                    onClose={this.openStateModel.bind(this, false)}
                >
                    <AtModalHeader>设置</AtModalHeader>
                    <AtModalContent>
                        是否禁止用户进行交易？
                    </AtModalContent>
                    <AtModalAction> <Button onClick={this.openStateModel.bind(this, false)}>取消</Button> <Button onClick={this.handleConfirm.bind(this, { openid: OpenID })}>同意</Button> </AtModalAction>
                </AtModal>
                <AtModal 
                    isOpened={Boolean(isResonOpened)}
                    closeOnClickOverlay
                    onClose={this.openResonModel.bind(this, false)}
                >
                    <AtModalHeader>原因</AtModalHeader>
                    <AtModalContent>
                        {/* <Textarea
                            value={reson}
                            className='textarea'
                            placeholderClass='placeholderClass'
                            placeholder='请填写原因'
                            onInput={this.handleTextareaChange}
                        /> */}
                        <Input 
                            value={reson}
                            className='textarea'
                            placeholderClass='placeholderClass'
                            placeholder='请填写原因'
                            onInput={this.handleTextareaChange}
                        />
                    </AtModalContent>
                    <AtModalAction> <Button onClick={this.openResonModel.bind(this, false)}>取消</Button> <Button onClick={this.handleResonConfirm.bind(this, { openid: OpenID })}>驳回</Button> </AtModalAction>
                </AtModal>
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
                        <View className={`${baseClass}-agreeHolder-icon`}>
                            <Image src={icons.Record} onClick={this.openRecordModel.bind(this, true)} className={`${baseClass}-agreeHolder-icon-image`}/>
                            <Image src={icons.Setting} onClick={this.openStateModel.bind(this, true)} className={`${baseClass}-agreeHolder-icon-image`}/>
                        </View>
                        <View 
                            className={`${baseClass}-agreeHolder-agree`}
                            onClick={dealCensor.bind(this, { action: 'agree', OpenID, isbn, price, Censor_id, title, pic, credit})}
                        >同意</View>
                        <View 
                            className={`${baseClass}-agreeHolder-disAgree`}
                            onClick={this.openResonModel.bind(this, true)}
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