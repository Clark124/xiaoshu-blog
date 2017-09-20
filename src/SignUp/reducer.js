import { SIGNUP_STARTED, SIGNUP_SUCCESS, SIGNUP_FAILURE } from './actionTypes.js';
import * as Status from './status.js';


export default (state ={status:Status.LOADING},action)=>{
    switch(action.type){
        case SIGNUP_STARTED:{
            return {status:Status.LOADING}
        }
        case SIGNUP_SUCCESS:{
            return {...state,status:Status.SUCCESS,...action.result}
        }
        case SIGNUP_FAILURE:{
            return {status:Status.FAILURE,errormsg:'服务器出错' }
        }
        default:{
            return state
        }
    }
}