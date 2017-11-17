import {actionNames} from "action-utils";
import {notification} from "antd";
import md5 from 'blueimp-md5'
import config from '../config'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export function login(id, pwd) {
    return dispatch => {
        let _pwd = md5(pwd)
        return fetch(config.api.user.login(id, _pwd), {method: 'post'}).then(res => res.json()).then(res => {

            dispatch({type: LOGIN_SUCCESS, payload: res})
        })
    }
}

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export function logout() {
    return dispatch => {
        return fetch(config.api.user.logout, {
            method: 'delete',
            headers: {
                'authorization': sessionStorage.getItem('auth')
            }
        }).then(res => res.text()).then(res => {
            dispatch({type: LOGOUT_SUCCESS, payload: res})
        })
    }
}

const callAPIHOC = (page,pageSize,query='') => {
    return (getState) => {
        if(typeof page ==='undefined'){
            page = getState().getIn(['user','otherData','offset'],0)
        }
        if(!pageSize){
            pageSize = getState().getIn(['user','otherData','limit'],10)
        }
        return fetch(config.api.user.get(page, pageSize,query), {
            headers: {
                'authorization': sessionStorage.getItem('auth')
            },
            redirect: 'manual'
        }).then(res => {
            return res
        }).then(res => res.json()).then(res => {
            if(res.status==2){
                notification.error({message:res.errorMes})
            }
            res.offset = page
            res.limit = pageSize
            res.query = query
            return res
        })
    }
}

export const GET_USER = actionNames('GET_USER')
export function getUser(page,pageSize,query){
    return {
        types:GET_USER,
        callAPI:callAPIHOC(page,pageSize,query),
    }
}

export function addUser(formData){
    return dispatch => {
        return fetch(config.api.user.add,{
            method:'post',
            headers:{
                authorization:sessionStorage.getItem('auth'),
            },
            body:formData
        }).then(res => res.json()).then(res => {
            if(res.status == 2){
                notification.error({message:res.errorMes})
            }

            dispatch({
                types:GET_USER,
                callAPI:callAPIHOC()
            })
        })
    }
}

export function editUser(formData){
    return dispatch => {
        return fetch(config.api.user.edit,{
            method:'post',
            headers:{
                authorization:sessionStorage.getItem('auth'),
            },
            body:formData
        }).then(res => res.json()).then(res => {
            if(res.status == 2){
                notification.error({message:res.errorMes})
            }

            dispatch({
                types:GET_USER,
                callAPI:callAPIHOC()
            })
        })
    }
}

export function deleteUser(id){
    return dispatch => {
        return fetch(config.api.user.delete(id),{
            method:'delete',
            headers:{
                authorization:sessionStorage.getItem('auth')
            }
        }).then(res => res.json()).then(res => {
            if(res.status == 2){
                notification.error({message:res.errorMes})
            }

            dispatch({
                types:GET_USER,
                callAPI:callAPIHOC()
            })
        })
    }
}
