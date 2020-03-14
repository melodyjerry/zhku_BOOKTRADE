import {
    GETALLCENSOR,
    GETUSERCENSOR
} from '@constants/censor'

const INITIAL_STATE ={
    censorList: [],
    selfCensorListUnaudited: [],
    selfCensorListPass: [],
    selfCensorListFail: []
}

export default function censor(state = INITIAL_STATE, action) { 
    switch (action.type) {
        case GETALLCENSOR: 
            return {
                ...state,
                censorList: action.payload.data.ret === 0 ? action.payload.data.censors_list : [],
            }
        case GETUSERCENSOR:
            // 订单表分类
            const { ret, censors_list } = action.payload.data
            let Unaudited=[], Pass=[], Fail=[]
            censors_list.map((value, index) => {
                if (value.state === '1') Unaudited.push(value)
                else if (value.state === '2') Pass.push(value)
                else if (value.state === '3') Fail.push(value)
            })
            return {
                ...state,
                selfCensorListUnaudited: Unaudited,
                selfCensorListPass: Pass,
                selfCensorListFail: Fail
            }
        default:
            return state

    }
}