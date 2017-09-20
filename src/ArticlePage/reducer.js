import {
    FETCH_STARTED, FETCH_SUCCESS, FETCH_FAILURE, ADD_COMMENT,
    ADD_REPLY, ADD_SUPPORT, REMOVE_SUPPORT, DELETE_COMMENT, DELETE_REPLY,
    ADD_PRAISE, REMOVE_PRAISE
} from './actionTypes.js';
import * as Status from './status.js';


export default (state = { status: Status.LOADING }, action) => {
    switch (action.type) {
        case FETCH_STARTED: {
            return { status: Status.LOADING }
        }
        case FETCH_SUCCESS: {
            return { ...state, status: Status.SUCCESS, ...action.result }
        }
        case FETCH_FAILURE: {
            return { status: Status.FAILURE, errormsg: '服务器出错' }
        }
        case ADD_COMMENT: {
            return {
                ...state,
                article: { ...state.article, comment: [...state.article.comment, action.value] }
            }
        }
        case REMOVE_PRAISE: {
            return {
                ...state,
                praiseLen: state.praiseLen - 1,
                article: { ...state.article, praise: state.article.praise.filter((item) => item !== action.userId) }
            }
        }
        case ADD_PRAISE: {
            return {
                ...state,
                praiseLen: state.praiseLen + 1,
                article: { ...state.article, praise: [...state.article.praise, action.userId] }
            }
        }
        case DELETE_COMMENT: {
            return {
                ...state,
                article: {
                    ...state.article,
                    comment: state.article.comment.filter((item, index) => {
                        return index !== action.index
                    })
                }
            }
        }
        case DELETE_REPLY: {
            return {
                ...state,
                article: {
                    ...state.article,
                    comment: state.article.comment.map((item, index) => {
                        if (action.commentIndex === index) {
                            return {
                                ...item, reply: item.reply.filter((replyItem, replyItemIndex) => {
                                    return replyItemIndex !== action.replyIndex
                                })
                            }
                        } else {
                            return item
                        }
                    })
                }
            }
        }
        case ADD_REPLY: {
            return {
                ...state,
                article: {
                    ...state.article,
                    comment: state.article.comment.map((item, index) => {
                        if (action.index === index) {
                            return { ...item, reply: [...item.reply, action.value] }
                        } else {
                            return item
                        }
                    })
                }
            }
        }
        case ADD_SUPPORT: {
            return {
                ...state,
                article: {
                    ...state.article,
                    comment: state.article.comment.map((item, index) => {
                        if (action.index === index) {
                            return { ...item, support: [...item.support, action.userId] }
                        } else {
                            return item
                        }
                    })
                }
            }
        }
        case REMOVE_SUPPORT: {
            return {
                ...state,
                article: {
                    ...state.article,
                    comment: state.article.comment.map((item, index) => {
                        if (action.index === index) {
                            return { ...item, support: item.support.filter((userId) => userId !== action.userId) }
                        } else {
                            return item
                        }
                    })
                }
            }
        }
        default: {
            return state
        }
    }
}