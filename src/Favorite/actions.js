import {
    FETCH_STARTED, FETCH_SUCCESS, FETCH_FAILURE,
   
} from './actionTypes.js';

export const fetchFavoriteStarted = () => ({
    type: FETCH_STARTED
})

export const fetchFavoriteSuccess = (result) => ({
    type: FETCH_SUCCESS,
    result
})

export const fetchFavoriteFailure = (error) => ({
    type: FETCH_FAILURE,
    error
})

export const fetchFavorite = (userId) => {
    return (dispatch) => {
        dispatch(fetchFavoriteStarted())
        fetch('/favorite/fetchFavorite', {
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
                dispatch(fetchFavoriteSuccess(result.data))
            }).catch((error) => {
                dispatch(fetchFavoriteFailure(error));
            })
        }).catch((error) => {
            dispatch(fetchFavoriteFailure(error))
        })
    }
}