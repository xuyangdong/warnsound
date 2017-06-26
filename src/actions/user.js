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
