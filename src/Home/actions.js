import {
    FETCH_STARTED, FETCH_SUCCESS, FETCH_FAILURE, ADD_ARTICLE

} from './actionTypes.js';
export const addArticle = (result) => ({
    type: ADD_ARTICLE,
    result
})

export const fetchHomeStarted = () => ({
    type: FETCH_STARTED
})

export const fetchHomeSuccess = (result) => ({
    type: FETCH_SUCCESS,
    result
})

export const fetchHomeFailure = (error) => ({
    type: FETCH_FAILURE,
    error
})

export const fetchHome = () => {
    return (dispatch) => {
        dispatch(fetchHomeStarted())
        fetch('/home', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ page: 0 })
        }).then((ret) => {
            if (ret.status !== 200) {
                throw new Error('Fail to get response with status' + ret.status)
            }
            ret.json().then((result) => {
                dispatch(fetchHomeSuccess(result.data))
            }).catch((error) => {
                dispatch(fetchHomeFailure(error));
            })
        }).catch((error) => {
            dispatch(fetchHomeFailure(error))
        })
    }
}