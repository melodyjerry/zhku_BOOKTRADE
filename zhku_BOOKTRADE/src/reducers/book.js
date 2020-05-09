import {
    GETBOOKCOMMENT,
    GETBOOKINFO,
    GETMOREBOOK,
} from '@constants/book'

import {
    SEARCHBOOK
} from '@constants/search'

const INITIAL_STATE ={
    bookInfo: {},
    bookComment: [],
    commentBookList: [],
    bookScore: {},
    lastestBook: [],
    seachBook: [],
    hasMore: true,
}

export default function book(state = INITIAL_STATE, action) { 
    switch (action.type) {
        case GETBOOKINFO: 
            return {
                ...state,
                bookInfo: action.payload.data.book_info,
                commentBookList: action.payload.data.commentBookList,
                bookScore: {
                    oneStar: action.payload.data.oneStar,
                    twoStar: action.payload.data.twoStar,
                    threeStar: action.payload.data.threeStar,
                    fourStar: action.payload.data.fourStar,
                    fiveStar: action.payload.data.fiveStar,
                }
            }
        case GETBOOKCOMMENT:
            return {
                ...state,
                bookComment: action.payload.data.commentInfos,
            }
        case GETMOREBOOK:
            return {
                ...state,
                lastestBook: action.payload.data.ret === 0 ? state.lastestBook.concat(action.payload.data.books_list) : state.lastestBook,
                hasMore: action.payload.data.ret === -1 ? false : true
            }
        case SEARCHBOOK:
            return {
                ...state,
                seachBook: action.payload.data.ret === 0 ? action.payload.data.books_list : []
            }
        default:
            return state
    }
}