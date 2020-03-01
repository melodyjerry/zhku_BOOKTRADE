import { 
    API_GET_BOOK_INFO_BY_ISBN,
    API_GET_BOOK_COMMENT_BY_ISBN 
} from '@constants/api'
import { 
    GETBOOKINFO,
    GETBOOKCOMMENT
} from '@constants/book'
import { createAction } from '@utils/redux'


export const dispatchLoadBookInfo = (payload) => createAction({
    type: GETBOOKINFO,
    url: API_GET_BOOK_INFO_BY_ISBN,
    payload,
    method: 'GET'
})

export const dispatchLoadBookComment = (payload) => createAction({
    type: GETBOOKCOMMENT,
    url: API_GET_BOOK_COMMENT_BY_ISBN,
    payload,
    method: 'GET'
})