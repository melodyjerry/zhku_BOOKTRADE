import {
    GETBOOKCOMMENT,
    GETBOOKINFO
} from '@constants/book'

const INITIAL_STATE ={
    bookInfo: {},
    bookComment: [],
    bookScore: {},
}

export default function book(state = INITIAL_STATE, action) { 
    switch (action.type) {
        case GETBOOKINFO: 
            return {
                ...state,
                bookInfo: action.payload.data.book_info,
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
        default:
            return state

    }
}