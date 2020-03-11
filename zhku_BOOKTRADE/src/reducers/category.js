import {
    GETALLCATEGORY,
    GETSINGLECATEGORY,
} from '@constants/category'

const INITIAL_STATE ={
    allCategoryInfo: [],
    singleCategoryInfo: {},
}

export default function category(state = INITIAL_STATE, action) { 
    switch (action.type) {
        case GETALLCATEGORY: 
            return {
                ...state,
                allCategoryInfo: action.payload.data.info,
            }
        case GETSINGLECATEGORY:
            return {
                ...state,
                singleCategoryInfo: action.payload.data,
            }
        default:
            return state

    }
}