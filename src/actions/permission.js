import {actionNames} from 'action-utils'
import config from '../config'
import _ from 'lodash'
import {notification} from 'antd'
import callAPIHOCFactory from 'callAPIHOCFactory'

const callAPIHOC = callAPIHOCFactory('permission')

export const GET_PERMISSION = actionNames('GET_PERMISSION')
export function getPermission(page,pageSize) {
	return {
		types:GET_PERMISSION,
		callAPI:callAPIHOC(page,pageSize)
	}
}

export function addPermission(jsonData) {
	return dispatch => {
		return fetch(config.api.permission.add,{
			method:'post',
			headers:{
				'authorization':sessionStorage.getItem('auth'),
				'content-type':'application/json'
			},
			body:JSON.stringify(jsonData)
		}).then(res => res.json()).then(res => {
			if(res.state == 2){
				notification.error({message:res.errorMes})
			}
			dispatch({
				types:GET_PERMISSION,
				callAPI:callAPIHOC()
			})
		})
	}
}

export function editPermission(jsonData,id){
	return dispatch => {
		return fetch(config.api.permission.edit(id),{
			method:'put',
			headers:{
				'authorization':sessionStorage.getItem('auth'),
				'content-type':'application/json'
			},
			body:JSON.stringify(jsonData)
		}).then(res => res.json()).then(res => {
			if(res.state == 2){
				notification.error({message:res.errorMes})
			}
			dispatch({
				types:GET_PERMISSION,
				callAPI:callAPIHOC()
			})
		})
	}
}

export function deletePermission(id){
	return dispatch => {
		return fetch(config.api.permission.delete(id),{
			method:'delete',
			headers:{
				'authorization': sessionStorage.getItem('auth')
			}
		}).then(res => {
			dispatch({
				types:GET_PERMISSION,
				callAPI:callAPIHOC()
			})
		})
	}
}
