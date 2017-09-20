import { GET_USERINFO, SIGN_OUT, ADD_ATTENTION, REMOVE_ATTENTION, 
    CHANGE_AVATAR, CHANGE_EMAIL,CHANGE_SEX,CHANGE_RESUME} from './actionTypes.js';

export const changeResume = (value) =>({
    type: CHANGE_RESUME,
    value
})

export const changeSex = (value) =>({
    type: CHANGE_SEX,
    value
})
export const changeEmail = (value) =>({
    type: CHANGE_EMAIL,
    value
})

export const changeAvatar = (avatar) =>({
    type: CHANGE_AVATAR,
    avatar
})

export const getUserInfo = (userInfo) => ({
    type: GET_USERINFO,
    userInfo
})
export const signOut = () => ({
    type: SIGN_OUT
})

export const addAttention = (authorUserid)=>({
    type:ADD_ATTENTION,
    authorUserid
})
export const removeAttention = (authorUserid)=>({
    type:REMOVE_ATTENTION,
    authorUserid
})