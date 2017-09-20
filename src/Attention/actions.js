import {
    FETCH_STARTED, FETCH_SUCCESS, FETCH_FAILURE,
   
} from './actionTypes.js';

export const fetchAttentionStarted = () => ({
    type: FETCH_STARTED
})

export const fetchAttentionSuccess = (result) => ({
    type: FETCH_SUCCESS,
    result
})

export const fetchAttentionFailure = (error) => ({
    type: FETCH_FAILURE,
    error
})

export const fetchAttention = (userId) => {
    return (dispatch) => {
        dispatch(fetchAttentionStarted())
        fetch('/attention/fetchAttention', {
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
                dispatch(fetchAttentionSuccess(result.data))
            }).catch((error) => {
                dispatch(fetchAttentionFailure(error));
            })
        }).catch((error) => {
            dispatch(fetchAttentionFailure(error))
        })
    }
}