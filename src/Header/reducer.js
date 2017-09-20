import {
    GET_USERINFO, SIGN_OUT, ADD_ATTENTION, REMOVE_ATTENTION,
    CHANGE_AVATAR, CHANGE_SEX, CHANGE_EMAIL,CHANGE_RESUME
} from './actionTypes.js';

export default (state = { isLogin: false, userInfo: {} }, action) => {
    switch (action.type) {
        case CHANGE_RESUME: {
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    resume: action.value
                }
            }
        }
        case CHANGE_EMAIL: {
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    email: action.value
                }
            }
        }
        case CHANGE_SEX: {
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    sex: action.value
                }
            }
        }
        case CHANGE_AVATAR: {
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    avatar: action.avatar
                }
            }
        }
        case ADD_ATTENTION: {
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    attentions: [...state.userInfo.attentions, action.authorUserid]
                }
            }
        }
        case REMOVE_ATTENTION: {
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    attentions: state.userInfo.attentions.filter((item) => item !== action.authorUserid)
                }
            }
        }
        case GET_USERINFO: {
            return { ...state, isLogin: true, userInfo: action.userInfo }
        }
        case SIGN_OUT: {
            return { ...state, isLogin: false, userInfo: {} }
        }
        default: {
            return state
        }
    }
}