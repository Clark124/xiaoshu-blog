import {
    FETCH_STARTED, FETCH_SUCCESS, FETCH_FAILURE, ADD_COMMENT,
    ADD_REPLY, ADD_SUPPORT,REMOVE_SUPPORT, DELETE_COMMENT, DELETE_REPLY, 
    ADD_PRAISE, REMOVE_PRAISE
} from './actionTypes.js';

export const addPraise =(userId) => ({
    type: ADD_PRAISE,
    userId
})

export const removePraise = (userId)=>({
    type: REMOVE_PRAISE,
    userId
})

export const deleteReply = (commentIndex,replyIndex) => ({
    type: DELETE_REPLY,
    commentIndex,
    replyIndex
})
export const deleteComment = (index) => ({
    type: DELETE_COMMENT,
    index
})

export const addReply = (value, index) => ({
    type: ADD_REPLY,
    value,
    index
})
export const removeSupport = (userId,index) =>({
    type: REMOVE_SUPPORT,
    userId,
    index
})
export const addSupport = (userId, index) => ({
    type: ADD_SUPPORT,
    userId,
    index
})
export const addComment = (value) => ({
    type: ADD_COMMENT,
    value
})
export const fetchArticleStarted = () => ({
    type: FETCH_STARTED
})

export const fetchArticleSuccess = (result) => ({
    type: FETCH_SUCCESS,
    result
})

export const fetchArticleFailure = (error) => ({
    type: FETCH_FAILURE,
    error
})

export const fetchArticle = (articleId) => {
    return (dispatch) => {
        dispatch(fetchArticleStarted())
        fetch('/article/fetchArticlePage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(articleId)
        }).then((ret) => {
            if (ret.status !== 200) {
                throw new Error('Fail to get response with status' + ret.status)
            }
            ret.json().then((result) => {
                dispatch(fetchArticleSuccess(result.data))
            }).catch((error) => {
                dispatch(fetchArticleFailure(error));
            })
        }).catch((error) => {
            dispatch(fetchArticleFailure(error))
        })
    }
}