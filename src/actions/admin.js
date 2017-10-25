import {actionNames} from 'action-utils'
import config from '../config'
import _ from 'lodash'
import {notification} from 'antd'
import callAPIHOCFactory from 'callAPIHOCFactory'

const callAPIHOC = callAPIHOCFactory('admin')

export const GET_ADMIN = actionNames('GET_ADMIN')
export function getAdmin(page,pageSize) {
	return {
		types:GET_ADMIN,
		callAPI:callAPIHOC(page,pageSize)
	}
}

export function addAdmin(jsonData) {
	return dispatch => {
		return fetch(config.api.admin.add,{
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
				types:GET_ADMIN,
				callAPI:callAPIHOC()
			})
		})
	}
}

export function editAdmin(jsonData,id){
	notification.error({message:'暂无更新功能'})
}

export function deleteAdmin(id){
	return dispatch => {
		return fetch(config.api.admin.delete(id),{
			method:'delete',
			headers:{
				'authorization': sessionStorage.getItem('auth')
			}
		}).then(res => {
			dispatch({
				types:GET_ADMIN,
				callAPI:callAPIHOC()
			})
		})
	}
}
