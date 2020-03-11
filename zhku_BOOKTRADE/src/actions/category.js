import { 
    API_GET_All_CATEGORY_INFO,
    API_GET_SINGLECATEGORY_BY_TYPE,
} from '@constants/api'
import { 
    GETALLCATEGORY,
    GETSINGLECATEGORY,
} from '@constants/category'
import { createAction } from '@utils/redux'


export const dispatchLoadAllCategoryInfo = (payload) => createAction({
    type: GETALLCATEGORY,
    url: API_GET_All_CATEGORY_INFO,
    payload,
    method: 'GET'
})

export const dispatchLoadSingleCategoryInfo = (payload) => createAction({
    type: GETSINGLECATEGORY,
    url: API_GET_SINGLECATEGORY_BY_TYPE,
    payload,
    method: 'GET'   
})
