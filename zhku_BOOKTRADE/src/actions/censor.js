import { 
    API_GET_All_CENSOR_INFO,
    API_GET_USER_CENSOR_BY_OPENID
} from '@constants/api'
import { 
    GETALLCENSOR,
    GETUSERCENSOR
} from '@constants/censor'
import { createAction } from '@utils/redux'


export const dispatchLoadAllCensor = (payload) => createAction({
    type: GETALLCENSOR,
    url: API_GET_All_CENSOR_INFO,
    payload,
    method: 'GET'
})


export const dispatchLoadUserCensor = (payload) => createAction({
    type: GETUSERCENSOR,
    url: API_GET_USER_CENSOR_BY_OPENID,
    payload,
    method: 'GET'
})