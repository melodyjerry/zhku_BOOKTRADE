import { GETBECOMMENTEDBOOK, COMMENTSUBMIT } from '@constants/comment'
import { API_GET_BECOMMENT_BOOK, API_COMMENT_SUBMIT } from '@constants/api'
import { createAction } from '@utils/redux'


export const dispatchLoadBeCommentBook = (payload) => createAction({
    type: GETBECOMMENTEDBOOK,
    url: API_GET_BECOMMENT_BOOK,
    payload,
    method: 'GET'
})


export const dispatchSubmitComment = (payload) => createAction({
    type: COMMENTSUBMIT,
    url: API_COMMENT_SUBMIT,
    payload,
    method: 'GET'
})
