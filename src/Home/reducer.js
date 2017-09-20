import {
    FETCH_STARTED, FETCH_SUCCESS, FETCH_FAILURE, ADD_ARTICLE
} from './actionTypes.js';
import * as Status from './status.js';


export default (state = { status: Status.LOADING }, action) => {
    switch (action.type) {
        case ADD_ARTICLE: {
            return {...state, articleList:[...state.articleList,...action.result.articleList]}
        }
        case FETCH_STARTED: {
            return { status: Status.LOADING }
        }
        case FETCH_SUCCESS: {
            return { ...state, status: Status.SUCCESS, ...action.result }
        }
        case FETCH_FAILURE: {
            return { status: Status.FAILURE, errormsg: '服务器出错' }
        }
        
        default: {
            return state
        }
    }
}