import { 
    API_GET_BOOK_INFO_BY_ISBN,
    API_GET_BOOK_COMMENT_BY_ISBN,
    API_GET_MORE_LASTEST_BOOK,
    API_GET_BOOK_INFO_BY_KEY,
} from '@constants/api'
import { 
    GETBOOKINFO,
    GETBOOKCOMMENT,
    GETMOREBOOK,
} from '@constants/book'
import { SEARCHBOOK } from '@constants/search'
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

export const dispatchLoadMoreBook = (payload) => createAction({
    type: GETMOREBOOK,
    url: API_GET_MORE_LASTEST_BOOK,
    payload,
    method: 'GET'
})

export const dispatchSearchBook = (payload) => createAction({
    type: SEARCHBOOK,
    url: API_GET_BOOK_INFO_BY_KEY,
    payload,
    method: 'GET'
})