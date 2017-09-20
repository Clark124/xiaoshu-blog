import { SIGNUP_STARTED, SIGNUP_SUCCESS, SIGNUP_FAILURE } from './actionTypes.js';

export const signUpStarted = () => ({
    type: SIGNUP_STARTED
})

export const signUpSuccess = (result) => ({
    type: SIGNUP_SUCCESS,
    result
})

export const signUpFailure = (error) => ({
    type: SIGNUP_FAILURE,
    error
})

export const signUp = (userinfo) => {
    return (dispatch) => {
        dispatch(signUpStarted())
        fetch('/regist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userinfo)
        }).then((ret) => {
            if (ret.status !== 200) {
                throw new Error('Fail to get response with status' + ret.status)
            }
            ret.json().then((retJson) => {
                dispatch(signUpSuccess(retJson))
            }).catch((error) => {
                dispatch(signUpFailure(error));
            })
        }).catch((error) => {
            dispatch(signUpFailure(error))
        })
    }
}