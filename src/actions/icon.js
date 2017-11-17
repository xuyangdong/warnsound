import {actionNames} from 'action-utils'
import config from '../config'
import _ from 'lodash'
import {notification} from 'antd'
import callAPIHOCFactory from 'callAPIHOCFactory'

const callAPIHOC = callAPIHOCFactory('resource')

export const GET_ICON = actionNames('GET_ICON')
export function getIcon(page,pageSize) {
	return {
		types:GET_ICON,
		callAPI:callAPIHOC(page,pageSize)
	}
}

export function addIcon(formData){
	return dispatch => {
		return fetch(config.api.resource.add,{
			method:'post',
			headers:{
				'authorization':sessionStorage.getItem('auth')
			},
			body:formData
		}).then(res => res.json()).then(res => {
			if(res.state == 2){
				notification.error({message:res.errorMes})
			}
			return dispatch({
				types:GET_ICON,
				callAPI:callAPIHOC()
			})
		})
	}
}

export function editIcon(formData){
	return dispatch => {
		return fetch(config.api.resource.edit,{
			method:'post',
			headers:{
				'authorization':sessionStorage.getItem('auth')
			},
			body:formData
		}).then(res => res.json()).then(res => {
			if(res.statue == 2) {
				notification.error({message:res.errorMes})
			}
			return dispatch({
				types:GET_ICON,
				callAPI:callAPIHOC()
			})
		})
	}
}

export function deleteIcon(id) {
	return dispatch => {
		return fetch(config.api.resource.delete(id),{
			method:'delete',
			headers:{
				'authorization':sessionStorage.getItem('auth')
			}
		}).then(res => {
			return dispatch({
				types:GET_ICON,
				callAPI:callAPIHOC()
			})
		})
	}
}
