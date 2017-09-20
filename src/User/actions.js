import { FETCH_STARTED, FETCH_SUCCESS, FETCH_FAILURE } from './actionTypes.js';

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

export const fetchArticle = (userId) => {
    return (dispatch) => {
        dispatch(fetchArticleStarted())
        fetch('/article/fetcharticle', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userId)
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